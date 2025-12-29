import { NextResponse } from 'next/server'
import { sendMail } from '../../[locale]/_lib/nodemailer'

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, tel, message } = body

        // Basic validation
        if (!name || !email || !tel) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const result = await sendMail({ name, email, tel, message })

        if (result.error) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            )
        }

        return NextResponse.json({ message: result.message }, { status: 200 })

    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}
