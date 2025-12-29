'use client'
import { useState } from "react"
import { RxPaperPlane } from "react-icons/rx"

export default function ContactForm() {
  const [data, setData] = useState({name: '', tel: '', email: '', message: ''})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmitForm = async () => {
    setIsSubmitting(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://server-production-7c47.up.railway.app'
    try {
      const response = await fetch(`${apiUrl}/api/express/contact`, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: "cors",
        cache: "no-cache",
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const returndata = await response.json()
      window.alert(returndata)
      clearData()
    } catch (error) {
      window.alert('Error sending message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearData = () => {
    setData({name: '', tel: '', email: '', message: ''})
  }

  return (
    <div id="contact" className="w-full mx-auto">
      <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-12">
        Contact Me
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmitForm()
        }}
        className="space-y-6"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
            Name *
          </label>
          <input
            id='name'
            type="text"
            name="name"
            required
            value={data.name}
            onChange={(e) => setData(prevData => ({ ...prevData, name: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Your name"
          />
        </div>

        {/* Tel */}
        <div>
          <label htmlFor="tel" className="block text-sm font-medium text-slate-300 mb-2">
            Phone *
          </label>
          <input
            id='tel'
            type="tel"
            name="tel"
            required
            value={data.tel}
            onChange={(e) => setData(prevData => ({ ...prevData, tel: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="+33 X XX XX XX XX"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email *
          </label>
          <input
            id='email'
            type="email"
            name="email"
            required
            value={data.email}
            onChange={(e) => setData(prevData => ({ ...prevData, email: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="your@email.com"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
            Message
          </label>
          <textarea
            id='message'
            name="message"
            rows="6"
            value={data.message}
            onChange={(e) => setData(prevData => ({ ...prevData, message: e.target.value }))}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              Send Message
              <RxPaperPlane />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
