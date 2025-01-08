import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CollaboratorInfo {
  name: string;
  fullName: string;
  color: string;
  avatar?: string;
  role?: string;
}

interface CollaboratorsListProps {
  collaborators: CollaboratorInfo[];
}

export const CollaboratorsList = ({ collaborators }: CollaboratorsListProps) => {
  return (
    <div className="flex -space-x-2">
      {collaborators.map((collaborator, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Avatar
              className="w-8 h-8 border-2 border-white cursor-pointer ring-2 ring-offset-2"
              style={{
                backgroundColor: collaborator.color + "20",
                borderColor: collaborator.color,
              }}
            >
              <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
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