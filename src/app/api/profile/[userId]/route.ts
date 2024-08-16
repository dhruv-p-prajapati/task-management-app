import { mongoInit } from '@/lib/db/dbConfig';
import User from '@/models/user.model';
import { IAPIResponse } from '@/types/APIResponse.types';
import { IUser } from '@/types/user.types';
import { NextRequest, NextResponse } from 'next/server';

interface IProfileParams {
  userId: string;
}

mongoInit();

export async function GET(
  request: NextRequest,
  { params }: { params: IProfileParams },
) {
  try {
    const user = await User.findById(params.userId);

    if (!user) {
      return NextResponse.json<IAPIResponse<null>>({
        success: false,
        data: null,
        message: 'User not found.',
        status: 404,
      });
    }

    return NextResponse.json<IAPIResponse<IUser>>({
      success: true,
      data: user,
      message: 'User found successfully.',
      status: 200,
    });
  } catch (error: any) {
    console.log('Error :- ', error.message);
    return NextResponse.json<IAPIResponse<null>>({
      success: false,
      data: null,
      message: 'Internal server error. Try again later.',
      status: 500,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IProfileParams },
) {
  try {
    const { name, bio } = await request.json();

    const user = await User.findByIdAndUpdate(params.userId, {
      name,
      bio,
    });

    if (!user) {
      return NextResponse.json<IAPIResponse<null>>({
        success: false,
        data: null,
        message: 'User not found.',
        status: 404,
      });
    }

    return NextResponse.json<IAPIResponse<IUser>>({
      success: true,
      data: user,
      message: 'User profile updated successfully.',
      status: 200,
    });
  } catch (error: any) {
    console.log('Error :- ', error.message);
    return NextResponse.json<IAPIResponse<null>>({
      success: false,
      data: null,
      message: 'Internal server error. Try again later.',
      status: 500,
    });
  }
}
