import React from 'react';

interface ISingleTaskParams {
  projectId: string;
  taskId: string;
}

const SingleTask = ({ params }: { params: ISingleTaskParams }) => {
  console.log(params);
  return (
    <div>
      Task - {params.taskId} and inside project - {params.projectId}
    </div>
  );
};

export default SingleTask;
