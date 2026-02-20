export default function LoadingSpinner({ text }: { text: string }) {
  return (
    <div className="text-center py-10 text-mid italic font-[family-name:var(--font-lora)]">
      {text}<span className="loading-dots" />
    </div>
  )
}
