interface IPProjectMetricsProps {}

const ProjectMetrics = ({}: IPProjectMetricsProps) => (
  <div className="bg-gradient-to-r from-background to-background-200 to-80% py-4 px-3 border-small rounded-md flex flex-col gap-4">
    <div>Metrics</div>
    <div className="text-small">
      <div className="text-default-500">
        Repos ........ <span className="text-white">2</span>
      </div>
      <div className="text-small text-default-500">
        Active Issues ........ <span className="text-white">3</span>
      </div>
      <div className="text-small text-default-500">
        Curators ........ <span className="text-white">3</span>
      </div>
      <div className="text-small text-default-500">
        Contributors ........ <span className="text-white">3</span>
      </div>
    </div>
    <div>Git Stats</div>
  </div>
);

export default ProjectMetrics;
