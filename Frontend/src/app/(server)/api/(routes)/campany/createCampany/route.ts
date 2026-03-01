import campanyModel from "@/models/companyModel";
import { connect } from "@/dbConfig/dbConfig"
connect();
import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest,) {
  try {
    const {
      name,
      industry,
      address,
      ceo,
      phone,
      logo
    }: any = await req.json();
    const company = await campanyModel.findOne({ name })
    if (company) {
      return NextResponse.json({ error: "company already exists" }, { status: 400 });
    }
    const newcompanys = new campanyModel({
      name,
      industry,
      address,
      ceo,
      phone,
      logo
    })
    const savedcompany = await newcompanys.save();
    return NextResponse.json({
      message: "company created successfully",
      success: true,
      savedcompany
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
