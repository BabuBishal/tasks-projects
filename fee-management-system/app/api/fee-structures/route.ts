import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { FeeStructureResponse } from '@/lib/types/api'
import { FeeStructure } from '@/lib/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const programId = searchParams.get('programId')

    const whereClause = programId
      ? {
          programSemester: {
            programId,
          },
        }
      : {}

    const feeStructures = await prisma.feeStructure.findMany({
      where: whereClause,
      include: {
        programSemester: {
          include: {
            program: true,
          },
        },
      },
      orderBy: {
        programSemester: {
          semesterNo: 'asc',
        },
      },
    })

    return NextResponse.json<FeeStructureResponse[]>(feeStructures)
  } catch (error) {
    console.error('Error fetching fee structures:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to fetch fee structures from database',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { programId, semesterNo, tuitionFee, labFee, libraryFee, sportsFee, miscFee } = body

    // Calculate total fee
    const totalFee =
      (tuitionFee || 0) + (labFee || 0) + (libraryFee || 0) + (sportsFee || 0) + (miscFee || 0)

    // 1. Find or create ProgramSemester
    let programSemester = await prisma.programSemester.findFirst({
      where: {
        programId,
        semesterNo: Number(semesterNo),
      },
    })

    if (!programSemester) {
      programSemester = await prisma.programSemester.create({
        data: {
          programId,
          semesterNo: Number(semesterNo),
        },
      })
    }

    // 2. Check if FeeStructure already exists for this semester
    const existingFeeStructure = await prisma.feeStructure.findFirst({
      where: {
        programSemesterId: programSemester.id,
      },
    })

    let feeStructure
    if (existingFeeStructure) {
      // Update existing fee structure
      feeStructure = await prisma.feeStructure.update({
        where: { id: existingFeeStructure.id },
        data: {
          tuitionFee: Number(tuitionFee),
          labFee: Number(labFee),
          libraryFee: Number(libraryFee),
          sportsFee: Number(sportsFee),
          miscFee: Number(miscFee),
          totalFee,
        },
      })
    } else {
      // Create new fee structure
      feeStructure = await prisma.feeStructure.create({
        data: {
          programSemesterId: programSemester.id,
          tuitionFee: Number(tuitionFee),
          labFee: Number(labFee),
          libraryFee: Number(libraryFee),
          sportsFee: Number(sportsFee),
          miscFee: Number(miscFee),
          totalFee,
        },
      })
    }

    return NextResponse.json<FeeStructure>(feeStructure, {
      status: 201,
    })
  } catch (error: unknown) {
    console.error('Error creating fee structure:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create fee structure'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
