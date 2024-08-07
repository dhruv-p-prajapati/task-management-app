import React from 'react';

interface ISingleProjectParams {
  projectId: string;
}

const SingleProject = ({ params }: { params: ISingleProjectParams }) => {
  console.log(params);
  return <div>Single Project - {params.projectId}</div>;
};

export default SingleProject;
