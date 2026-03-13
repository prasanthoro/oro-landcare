import { NextRequest, NextResponse } from "next/server";
import { UserController } from "../../../../../../lib/controllers/userController";
const userController = new UserController();

export async function POST(req: NextRequest) {
    return userController.signUp(req);
}