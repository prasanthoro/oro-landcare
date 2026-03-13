import { NextRequest } from "next/server";
import { MarkersController } from "../../../../../../../../../../lib/controllers/markersController";

const markersController = new MarkersController();


export async function GET(req: NextRequest, { params }: { params: Promise<any> }) {
    const resolvedParams = await params;
    return markersController.getMarkersByCoordinates(resolvedParams);
}
