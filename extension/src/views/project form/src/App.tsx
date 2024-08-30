function App() {
  return (
    <div className="flex flex-col justify-center w-full p-4">
      <form action="" className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            className="w-full input input-bordered input-primary"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="resize-none textarea textarea-bordered textarea-primary"
            placeholder="Enter project description"
          ></textarea>
        </div>
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="repoLink">Repository Link</label>
            <input
              id="repoLink"
              type="url"
              placeholder="Enter GitHub repository link"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="liveLink">Live Link</label>
            <input
              id="liveLink"
              type="url"
              placeholder="Enter live link"
              className="w-full input input-bordered input-primary"
            />
          </div>
        </div>

        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="techStack">Tech Stack</label>
            <input
              id="techStack"
              type="text"
              placeholder="Enter tech stack"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="domain">Domain</label>
            <input
              id="domain"
              type="text"
              placeholder="Enter domain"
              className="w-full input input-bordered input-primary"
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <label htmlFor="demoVideo">Demo Video Link</label>
          <input
            id="demoVideo"
            type="url"
            placeholder="Enter demo video link"
            className="w-full input input-bordered input-primary"
          />
        </div>
        <h2 className="text-xl font-bold">User Details</h2>
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter GitHub username"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="githubProfileLink">GitHub</label>
            <input
              id="githubProfileLink"
              type="url"
              placeholder="Enter link"
              className="w-full input input-bordered input-primary"
            />
          </div>
        </div>
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="twitterProfileLink">Twitter</label>
            <input
              id="twitterProfileLink"
              type="url"
              placeholder="Enter link"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-1">
            <label htmlFor="linkedInProfileLink">LinkedIn</label>
            <input
              id="linkedInProfileLink"
              type="url"
              placeholder="Enter link"
              className="w-full input input-bordered input-primary"
            />
          </div>
        </div>
        <button className="btn btn-primary w-fit">Submit</button>
      </form>
    </div>
  );
}

export default App;
