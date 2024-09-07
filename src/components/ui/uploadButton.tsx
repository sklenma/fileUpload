import { Upload } from "lucide-react";
import { Button } from "./button";

const UploadButton = () => {
  return (
    <Button variant="secondary">
      <Upload className="mr-4 h-4 w-4" /> Upload file
    </Button>
  );
}

export {UploadButton} 