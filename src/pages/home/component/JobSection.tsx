import JobCard from "@/components/ui/shared/JobCard";
import { Job } from "@/types/job";
import { useEffect, useState } from "react";

function JobSection() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    //can get server data
    const fetchjobs = async () => {
      const res = await fetch(
        "https://smarthireprotal-back-end-production.up.railway.app/jobs",
        {
          method: "GET",
        }
      );
      const data: Job[] = await res.json();
      return data;
    };

    fetchjobs().then((newData) => setJobs(newData)); //promise of fetchjob
  }, []);

  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              type={job.type}
              location={job.location}
              _id={job._id}
              isAdmin={false}
            />
          );
        })}
      </div>
    </section>
  );
}

export default JobSection;
