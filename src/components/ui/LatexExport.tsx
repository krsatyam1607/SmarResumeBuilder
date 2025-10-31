import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiCopy } from "react-icons/fi";
import { toast } from "sonner";
import { generateLatex } from "@/utils/latexGenerator";
import { ResumeData } from "@/types/resume";

interface LatexExportProps {
  resumeData: ResumeData;
}

export const LatexExport = ({ resumeData }: LatexExportProps) => {
  const [open, setOpen] = useState(false);

  const handleCopyLatex = () => {
    const latex = generateLatex(resumeData);
    navigator.clipboard.writeText(latex);
    toast.success("LaTeX code copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FiCopy /> View LaTeX Code
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>LaTeX Resume Code (Overleaf Compatible)</DialogTitle>
        </DialogHeader>

        <textarea
          readOnly
          value={generateLatex(resumeData)}
          className="w-full h-[400px] p-3 font-mono text-sm border rounded-md bg-muted/20"
        />

        <div className="flex justify-end mt-4">
          <Button onClick={handleCopyLatex} className="gap-2">
            <FiCopy /> Copy to Clipboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
