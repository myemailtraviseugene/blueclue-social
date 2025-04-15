import Image from "next/image";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div className="retro-box">
        <h2 className="retro-header">Inbox</h2>
        <p className="mb-2">No new messages. (Messaging coming soon!)</p>
        <div className="flex gap-4">
          <button className="bg-[#4267B2] text-white px-3 py-1 rounded-sm text-xs" disabled>Compose</button>
          <button className="border border-[#3B5998] text-[#3B5998] px-3 py-1 rounded-sm text-xs" disabled>Sent</button>
        </div>
      </div>
      <div className="retro-box">
        <h2 className="retro-header">Sample Message</h2>
        <div className="flex items-center gap-4">
          <Image src="/file.svg" alt="avatar" width={40} height={40} className="w-10 h-10 rounded border border-gray-300" />
          <div>
            <div className="font-bold text-[#3B5998]">Jessica</div>
            <div className="text-xs">Subject: Remember me from choir?</div>
            <div className="text-xs text-gray-500">April 13, 2025</div>
            <div className="mt-1 text-sm">Hey! Long time no see. Hope you’re well!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
