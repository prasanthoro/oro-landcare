import { NextRequest } from "next/server";
import { validateAccessToken } from "../../../../../../lib/middlewares/authMiddleware";
import { MapsController } from "../../../../../../lib/controllers/mapsController";
const mapsController = new MapsController();




export async function GET(req: NextRequest, { params }: { params: Promise<any> }) {
    const resolvedParams = await params;
    return mapsController.getMapBySlug(resolvedParams);
}
