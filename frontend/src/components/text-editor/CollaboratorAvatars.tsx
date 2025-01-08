import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CollaboratorInfo } from "@/types";

interface CollaboratorAvatarsProps {
  collaborators: CollaboratorInfo[];
}

export const CollaboratorAvatars = ({ collaborators }: CollaboratorAvatarsProps) => {
  return (
    <div className="flex -space-x-2" >
      {collaborators.map((collaborator) => (
        <Tooltip key={collaborator.sessionId}>
          <TooltipTrigger asChild>
            <Avatar
              className="w-8 h-8 border-2 border-white cursor-pointer ring-2 ring-offset-2"
              style={{
                backgroundColor: collaborator.color + "20",
                borderColor: collaborator.color,
              }}
            >
              <AvatarFallback className="font-semibold text-sm" style={{ color: collaborator.color }}>
                {collaborator.name[0]}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <p className="font-medium">{collaborator.fullName}</p>
              <p className="text-xs text-gray-500">{collaborator.role}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};