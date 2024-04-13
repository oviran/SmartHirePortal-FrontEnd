/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Job } from "@/types/job";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, MapPin } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createJobApplication } from "@/lib/services/api/jobApplications";
import { getJobById } from "@/lib/services/api/jobs";
import { Document, Page, pdfjs } from "react-pdf";


// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function JobPage() {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id); // Gives us the value of the route param.

  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setSelectedFile(selectedFile);
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return navigate("/sign in");
    }

    if (!id) return;
    getJobById(id).then((data) => {
      setJob(data);
      setIsLoading(false);
    });
  }, [id, isLoaded, isSignedIn, navigate]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    if (!id) return;

    const jobApplicationData = {
      userId: user.id,
      fullName: formData.fullName,
      job: id,
      answers: [formData.a1, formData.a2, formData.a3],
      cv: selectedFile,
    };
    console.log(jobApplicationData);
    
   
    try {
       
      await createJobApplication(jobApplicationData);

      navigate(0);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      // Handle error, e.g., show error message to user
    }
  };

  if (isLoading || job === null) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>{job.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job.description}</p>
      </div>
      <Separator />
      <form className="py-8 " onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <h3>Full Name</h3>
          <Input
            className="mt-2"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4 py-4 text-yellow-300 italic font-semibold">
          Upload your CV in PDF format
        </div>
        <div className="pdf-box ">
          <div className="insert-box">
            <label htmlFor="pdf-upload">Insert PDF : </label>
            <input
              type="file"
              id="pdf-upload"
              onChange={handleFileChange}
              accept=".pdf" // Limit file input to accept only PDF files
            />
          </div>
          {selectedFile && (
            <Document file={selectedFile}>
              <Page pageNumber={1} />
            </Document>
          )}
        </div>
        {job.questions.map((question, i) => {
          return (
            <div key={i} className="mt-8">
              <h3>{question}</h3>
              <Textarea
                className="mt-2"
                name={`a${i + 1}`}
                required
                onChange={handleChange}
              />
            </div>
          );
        })}
        <Button type="submit" className="mt-8 bg-card text-card-foreground">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default JobPage;
