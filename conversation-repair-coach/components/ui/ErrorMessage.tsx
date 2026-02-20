export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-[#fef0f0] border border-[#f5c5c5] rounded-[10px] px-5 py-4 text-[#c0392b] text-[0.88rem] mb-4">
      {message}
    </div>
  )
}
