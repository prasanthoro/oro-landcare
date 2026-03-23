import TablePaginationComponent from "@/components/Core/TablePaginationComponent";
import TanstackTableComponent from "@/components/Core/TanstackTableComponent";
import SearchIcon from "@mui/icons-material/Search";
import { capitalize, InputAdornment, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { deleteMarkerAPI, getAllMapMarkersAPI } from "@/services/maps";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mapTypeOptions } from "@/lib/constants/mapConstants";
import { toast, Toaster } from "sonner";
import DeleteDialog from "@/components/Core/DeleteDialog";
import LoadingComponent from "@/components/Core/LoadingComponent";
import AutoCompleteSearch from "@/components/Core/AutoCompleteSearch";
import { ListMarkersColumns } from "./ListMarkersColumns";
import Image from "next/image";
import { copyURL } from "@/lib/helpers/copyURL";
import ShareLinkDialog from "@/components/Core/ShareLinkDialog";
import { getMarkersImagesBasedOnOrganizationType } from "@/lib/helpers/mapsHelpers";
import { addSerial } from "@/lib/helpers/addSerialNum";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MapMarkersListDialog = ({
  open,
  handleClose,
  markersRef,
  handleMarkerClick,
  getSingleMapMarkers,
  mapDetails,
  map,
}: any) => {
  const { id } = useParams();

  const [markers, setMarkers] = useState<any[]>([]);
  const [limitData, setLimitData] = useState<any>(12);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [search, setSearch] = useState("");
  const [selectType, setSelectType] = useState<any>();
  const [markerId, setMarkerId] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shareLinkDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [singleMapDetails, setSingleMapDetails] = useState<any>({});
  const [
    markersImagesWithOrganizationType,
    setMarkersImagesWithOrganizationType,
  ] = useState<any>({});
  const [orginisationTypesOptions, setOrginisationTypesOptions] = useState<any>(
    []
  );
  const [searchParams, setSearchParams] = useState<any>({});
  const handleClickDeleteOpen = (id: any) => {
    setDeleteOpen(true);
    setMarkerId(id);
  };
  const handleDeleteCose = () => {
    setDeleteOpen(false);
  };

  const getAllMapMarkers = async ({
    page = 1,
    limit = limitData,
    search_string = search,
    type = selectType?.title,
    sort_by = "",
    sort_type = "",
  }) => {
    setShowLoading(true);
    try {
      let queryParams: any = {
        search_string: search_string ? search_string : "",
        page: page,
        limit: limit,
        organisation_type: type ? type : "",
        sort_by: sort_by,
        sort_type: sort_type,
      };
      setSearchParams(queryParams);
      const response = await getAllMapMarkersAPI(id, queryParams);
      let { data, ...rest } = response;
      data = addSerial(data, +rest.page, +rest.limit);
      setMarkers(data);
      setPaginationDetails(rest);
    } catch (err) {
      console.error(err);
    } finally {
      setShowLoading(false);
    }
  };
  const getAllMapMarkersForOrginazations = async () => {
    setShowLoading(true);
    try {
      let queryParams: any = {
        get_all: true,
      };
      const response = await getAllMapMarkersAPI(id, queryParams);
      let markersImages: any = getMarkersImagesBasedOnOrganizationType(
        response?.data
      );
      let orginisationTypesOptions: any = Object.keys(markersImages).map(
        (key: any) => ({
          title: key,
          label: capitalize(key) || key,
          img: markersImages[key],
        })
      );
      setOrginisationTypesOptions(orginisationTypesOptions);
      setMarkersImagesWithOrganizationType(markersImages);
    } catch (err) {
      console.error(err);
    } finally {
      setShowLoading(false);
    }
  };

  const deleteMarker = async () => {
    setLoading(true);
    try {
      const response = await deleteMarkerAPI(id, markerId);
      toast.success(response?.message);
      getAllMapMarkers({});
      getSingleMapMarkers({});
      handleDeleteCose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      getAllMapMarkers({
        page: 1,
        limit: limitData,
        search_string: search,
        type: selectType?.title,
        sort_by: "",
        sort_type: "",
      });
      getAllMapMarkersForOrginazations();
    } else {
      // Reset all state when dialog closes so next open starts fresh
      setMarkers([]);
      setPaginationDetails({});
      setSearchParams({});
      setLimitData(12);
      setSearch("");
      setSelectType(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return; // Don't fire when dialog is closed
    const debounce = setTimeout(() => {
      getAllMapMarkers({
        page: 1,
        limit: limitData,
        search_string: search,
        type: selectType?.title,
        sort_by: "",
        sort_type: "",
      });
    }, 1000);
    return () => clearTimeout(debounce);
  }, [search]);

  const capturePageNum = (value: number) => {
    getAllMapMarkers({
      ...searchParams,
      limit: limitData,
      page: value,
    });
  };

  const captureRowPerItems = (value: number) => {
    setLimitData(value);
    getAllMapMarkers({
      ...searchParams,
      limit: value,
      page: 1,
    });
  };

  const handleSelectTypeChange = (newValue: any) => {
    if (newValue) {
      setSelectType(newValue);
      getAllMapMarkers({
        ...searchParams,
        type: newValue?.title,
      });
    } else {
      setSelectType(null);
      getAllMapMarkers({
        ...searchParams,
        type: "",
      });
    }
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      className="showAllMarkerDialog"
      slotProps={{
        paper: {
          style: {
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: "600px",
            maxHeight: "90vh",
            margin: "0 auto",
            maxWidth: "90%",
            borderRadius: "10px",
          },
        },
      }}
      sx={{ background: "#0000008f", zIndex: 1000 }}
    >
      {/* Sticky filter header — stays at top while table scrolls */}
      <div
        className="dialogHeader"
        style={{ flexShrink: 0, backgroundColor: "#fff", zIndex: 10 }}
      >
        <div className="dialogTitle">
          <Image src="/map/map-orangebg.svg" alt="" width={30} height={30} />
          <span> All Markers</span>
        </div>
        <div className="filterGrp">
          <TextField
            className="defaultTextFeild"
            variant="outlined"
            size="small"
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <AutoCompleteSearch
            data={orginisationTypesOptions || []}
            setSelectValue={setSelectType}
            selectedValue={selectType}
            placeholder="Select Type"
            onChange={handleSelectTypeChange}
          />
          <IconButton
            className="iconBtn"
            aria-label="close"
            onClick={handleClose}
          >
            <Image
              src="/map/close-with-border.svg"
              alt=""
              width={30}
              height={30}
            />
          </IconButton>
        </div>
      </div>

      {/* Scrollable table area — thead sticky works here */}
      <div
        style={{ flex: 1, overflowY: "auto" }}
        className="dialogTableScroll"
      >
        <TanstackTableComponent
          data={markers}
          getData={getAllMapMarkers}
          columns={ListMarkersColumns({
            handleClose,
            setShareDialogOpen,
            setSingleMapDetails,
            handleClickDeleteOpen,
            singleMapDetails,
            markersRef,
            handleMarkerClick,
            id,
            markers,
            mapDetails,
            markersImagesWithOrganizationType,
            map,
          })}
          loading={showLoading}
          searchParams={searchParams}
        />
      </div>

      {/* Sticky pagination — stays at bottom */}
      {markers?.length ? (
        <div style={{ flexShrink: 0 }}>
          <TablePaginationComponent
            paginationDetails={paginationDetails}
            capturePageNum={capturePageNum}
            captureRowPerItems={captureRowPerItems}
            values="Markers"
          />
        </div>
      ) : null}
      <DeleteDialog
        deleteOpen={deleteOpen}
        handleDeleteCose={handleDeleteCose}
        deleteFunction={deleteMarker}
        lable="Delete Marker"
        text="Are you sure you want to delete marker?"
        loading={loading}
      />
      <ShareLinkDialog
        open={shareLinkDialogOpen}
        setShareDialogOpen={setShareDialogOpen}
        mapDetails={singleMapDetails}
        linkToShare={`https://dev-landcare.vercel.app/landcare-map/${mapDetails?.slug}?marker_id=${singleMapDetails?.id}`}
      />
      <LoadingComponent loading={showLoading} />
    </BootstrapDialog>
  );
};
export default MapMarkersListDialog;
