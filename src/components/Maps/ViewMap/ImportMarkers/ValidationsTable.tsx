import { Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ValidationsTable = ({ validationsData, success }: any) => {
  const uploaded = validationsData[0]?.length ?? 0;
  const errors = validationsData[1] ?? [];

  return (
    <div className="validationTableContainer" id="validationTable">
      <div className="validationHead">
        <Typography variant="h5">Import Summary</Typography>
        <div className="importInfo">
          <Typography className="uploaded">
            Imported <span>{uploaded}</span>
          </Typography>
          <Typography className="failed">
            Failed <span>{errors.length}</span>
          </Typography>
        </div>
      </div>

      {success && errors.length === 0 && (
        <div className="importSuccessMsg">
          <CheckCircleOutlineIcon sx={{ color: "#75a237", fontSize: 20 }} />
          <Typography>
            All <strong>{uploaded}</strong> marker{uploaded !== 1 ? "s" : ""} imported successfully.
          </Typography>
        </div>
      )}

      {errors.length > 0 && (
        <div className="tableContainer">
          <table className="table">
            <thead
              className="thead"
              style={{
                height: "32px",
                position: "sticky",
                top: "0px",
                zIndex: 2,
                color: "white",
              }}
            >
              <tr className="table-row">
                <th className="cell" style={{ minWidth: "150px" }}>Title</th>
                <th className="cell" style={{ minWidth: "200px" }}>Type</th>
                <th className="cell" style={{ minWidth: "200px" }}>Website</th>
                <th className="cell" style={{ minWidth: "120px" }}>Phone</th>
                <th className="cell" style={{ minWidth: "180px" }}>Email</th>
                <th className="cell" style={{ minWidth: "100px" }}>Town</th>
                <th className="cell" style={{ minWidth: "180px" }}>Coordinates</th>
                <th className="cell" style={{ minWidth: "250px" }}>Error</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {errors.map((error: any, index: number) => (
                <tr className="table-row" key={index}>
                  <td className="cell">{error?.title || "N/A"}</td>
                  <td className="cell">{error?.organisation_type || "N/A"}</td>
                  <td className="cell">{error?.website || "N/A"}</td>
                  <td className="cell">{error?.phone || "N/A"}</td>
                  <td className="cell">{error?.email?.slice(0, 9) || "N/A"}</td>
                  <td className="cell">{error?.town || "N/A"}</td>
                  <td className="cell">{`${error?.coordinates}` || "N/A"}</td>
                  <td className="cell" style={{ color: "red" }}>{error.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ValidationsTable;
