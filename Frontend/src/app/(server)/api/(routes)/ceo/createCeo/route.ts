import ceoModel from "@/models/ceoModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const {
      ceoName,
      email,
      img,
      companyType,
    }: any = await req.json();
    const Ceo = await ceoModel.findOne({email});
    if (Ceo) {
      return NextResponse.json({ error: "Ceo already exists" }, { status: 400 });
    }
    const newCeo = new ceoModel({
      ceoName,
      email,
      img,
      companyType,
    })
    const savedCeo = await newCeo.save();
    return NextResponse.json({
      message: "Ceo created successfully",
      success: true,
      savedCeo
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
