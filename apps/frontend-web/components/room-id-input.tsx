"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createRoomId } from "@/actions/create-room-id";
import { checkRoom } from "@/actions/check-room";

type RoomIdInputProps = {};

export const RoomIdInput = ({}: RoomIdInputProps) => {
  const [roomAction, setRoomAction] = useState<string>("Join");
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState<string>(null!);
  const router = useRouter();
  const { isSignedIn } = useUser();

  const onClickButton = async () => {
    setLoading(true);

    if (!isSignedIn) {
      toast.error("Please Sign in first...");
      setLoading(false);
      return;
    }

    // joining room
    if (roomAction === "Join") {
      if (roomId) {
        const id = toast.loading("Joining...");

        try {
          const data = await checkRoom({ roomId });

          if (data.error) {
            toast.error(data.error, {
              id: id,
            });
          }

          if (data.roomId) {
            router.push(`/video/${data.roomId}`);
          }
        } catch (error) {
          toast.error("Something went wrong", {
            id: id,
          });
        }
      } else {
        toast.error("Please enter room Id");
      }
    }

    // creating room
    if (roomAction === "Create") {
      const id = toast.loading("Creating room for you");

      try {
        const data = await createRoomId();
        if (data.roomId) {
          toast.success("Room Created Successfully", {
            id: id,
          });
          router.push(`/video/${data.roomId}`);
        }
        if (data.error) {
          toast.error(data.error, {
            id: id,
          });
        }
      } catch (error) {
        toast.error("Something went wrong", {
          id: id,
        });
      }
    }

    setLoading(false);
  };
  return (
    <div>
      <div className={cn("flex gap-4", roomAction === "Create" && "gap-0")}>
        <Select
          defaultValue="Join"
          onValueChange={(value) => {
            setRoomAction(value);
          }}
        >
          <SelectTrigger
            className={cn(
              "w-fit space-x-4 ",
              roomAction === "Create" && "w-full flex"
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Join">Join</SelectItem>
            <SelectItem value="Create">Create </SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Please Enter room Id"
          className={cn(
            "w-[400px] ",
            roomAction === "Create" && "w-0 p-0 border-none "
          )}
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <Button
          className="w-full"
          onClick={() => onClickButton()}
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : roomAction}
        </Button>
      </div>
    </div>
  );
};
