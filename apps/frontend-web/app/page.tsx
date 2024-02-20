import { IsUserSignedIn } from "@/components/is-user-signed";
import { ModeToggle } from "@/components/mode-toggle";
import { RoomIdInput } from "@/components/room-id-input";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-background relative flex items-center justify-center">
      <div className="absolute right-10 top-6 flex gap-4">
        <IsUserSignedIn />
        <ModeToggle />
      </div>

      <div>
        <h1 className="mb-4 text-xl">Create / Join Room for Video Call</h1>
        <RoomIdInput />
      </div>
    </div>
  );
}
