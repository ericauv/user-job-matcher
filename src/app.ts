import fs from 'fs';

main();

function main(): void {
  const jobs: IJob[] = readJSONFile('./src/data/jobs.json');
  const users: IUser[] = readJSONFile('./src/data/users.json');

  const jobDictionary = getJobIdDictionaryOfJob(jobs);
  const tagDictionary = getTagDictionaryOfJobIds(jobs);

  users.forEach(user => {
    const matchedJobs = getMatchedJobsFromUserTags(
      user.tags,
      tagDictionary,
      jobDictionary
    );
    printMatchedJobs(user.id, matchedJobs);
  });
}
/**
 *
 *
 * @param {string} path path of json file to read
 * @returns parsed json
 */
function readJSONFile(path: string): any {
  const data = fs.readFileSync(path);
  return JSON.parse(data.toString());
}

/**
 *
 *
 * @param {Tag[]} userTags a user's tags
 * @param {IDictionary<JobId[]>} tagDictionaryOfJobIds key = Tag
 * @param {IDictionary<IJob>} jobIdDictionaryOfJobs key = JobID
 * @param {number} [numberOfCommonTagsRequired=2] Minimum number of common tags required for a job to be considered a match for a user
 * @returns {IJob[]} Jobs that had sufficient number of tags in common with userTags
 */
function getMatchedJobsFromUserTags(
  userTags: Tag[],
  tagDictionaryOfJobIds: IDictionary<JobId[]>,
  jobIdDictionaryOfJobs: IDictionary<IJob>,
  numberOfCommonTagsRequired: number = 2
): IJob[] {
  // get number of tags in common with user tags
  const jobIdDictionaryOfCommonTagCount = getJobIdDictionaryOfCommonTagCount(
    userTags,
    tagDictionaryOfJobIds
  );

  const matchedJobsFromUserTags = [];

  // push jobs that had
  // at least [numberOfCommonTagsRequired] tags in common with [userTags]
  // to return array
  for (const jobId in jobIdDictionaryOfCommonTagCount) {
    if (jobIdDictionaryOfCommonTagCount.hasOwnProperty(jobId)) {
      if (
        jobIdDictionaryOfCommonTagCount[jobId] >= numberOfCommonTagsRequired
      ) {
        matchedJobsFromUserTags.push(jobIdDictionaryOfJobs[jobId]);
      }
    }
  }
  return matchedJobsFromUserTags;
}

/**
 *
 *
 * @param {UserId} userId Id of user
 * @param {IJob[]} matchedJobs Array of jobs that matched user
 */
function printMatchedJobs(userId: UserId, matchedJobs: IJob[]): void {
  // print matched jobs if the user matched any jobs
  if (matchedJobs.length) {
    matchedJobs.forEach(job => {
      console.log(`User ${userId} matched to ${JSON.stringify(job)}`);
    });
  }
}

/**
 *
 *
 * @param {IJob[]} jobs Array of jobs
 * @returns {IDictionary<IJob>} Dictionary indexed by job.id, containing all jobs in [jobs]
 */
function getJobIdDictionaryOfJob(jobs: IJob[]): IDictionary<IJob> {
  const jobDictionary: IDictionary<IJob> = {};
  jobs.forEach(job => {
    jobDictionary[`${job.id}`] = { ...job };
  });
  return jobDictionary;
}

/**
 *
 *
 * @param {IJob[]} jobs Array of jobs
 * @returns {IDictionary<JobId[]>} Dictionary indexed by tag, containing array of job ids that contain tag
 */
function getTagDictionaryOfJobIds(jobs: IJob[]): IDictionary<JobId[]> {
  const tagDictionaryOfJobIds: IDictionary<JobId[]> = {};

  jobs.forEach(job => {
    job.tags.forEach(tag => {
      tagDictionaryOfJobIds.hasOwnProperty(tag)
        ? // Add the job id to jobId array for this tag
          tagDictionaryOfJobIds[tag].push(job.id)
        : // jobId array doesn't exist yet, create jobId array for this tag and add this job id
          (tagDictionaryOfJobIds[tag] = [job.id]);
    });
  });

  return tagDictionaryOfJobIds;
}

/**
 *
 *
 * @param {Tag[]} userTags a user's tags
 * @param {IDictionary<JobId[]>} tagDictionaryOfJobIds Dictionary indexed by tag containing array of jobIds of jobs that contain the tag
 * @returns {IDictionary<number>} Dictionary indexed by JobId, containing of count of tags in common a given job has with userTags
 */
function getJobIdDictionaryOfCommonTagCount(
  userTags: Tag[],
  tagDictionaryOfJobIds: IDictionary<JobId[]>
): IDictionary<number> {
  const jobIdDictionaryOfCommonTagCount: IDictionary<number> = {};

  // count number of tags in common with [userTags] for each job that has a tag contained in [userTags]
  userTags.forEach(tag => {
    tagDictionaryOfJobIds[tag].forEach(jobId => {
      if (jobIdDictionaryOfCommonTagCount[jobId]) {
        // entry exists for this jobId, add 1 to its count
        jobIdDictionaryOfCommonTagCount[jobId] += 1;
      } else {
        // entry doesn't exist for this jobId, create entry for this jobId, set count to 1
        jobIdDictionaryOfCommonTagCount[jobId] = 1;
      }
    });
  });

  return jobIdDictionaryOfCommonTagCount;
}
