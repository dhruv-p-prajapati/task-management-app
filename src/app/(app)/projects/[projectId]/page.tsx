import React from 'react';

interface ISingleProjectParams {
  projectId: string;
}

const SingleProject = ({ params }: { params: ISingleProjectParams }) => {
  console.log(params);
  const exampleProject = {
    _id: '60d21b9667d0d8992e610c85',
    name: 'Website Redesign',
    description: 'Redesign the company website with a modern look.',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-01'),
    status: 'In Progress',
    tasks: ['60d21b9967d0d8992e610c86', '60d21b9b67d0d8992e610c87'],
    createdBy: '60d21b8e67d0d8992e610c84',
    assignedUsers: ['60d21b8e67d0d8992e610c84', '60d21b9367d0d8992e610c85'],
    priority: 'High',
    budget: 5000,
    client: 'ABC Corp',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return (
    <div>{JSON.stringify(exampleProject)}</div>
    // <Card className="w-full max-w-md">
    //   <CardHeader>
    //     <div className="flex items-center justify-between">
    //       <CardTitle>{exampleProject.name}</CardTitle>
    //       <div className="flex items-center gap-2">
    //         <div
    //           className={`rounded-md px-2 py-1 text-xs font-medium ${
    //             exampleProject.status === 'In Progress'
    //               ? 'bg-yellow-100 text-yellow-800'
    //               : exampleProject.status === 'Completed'
    //                 ? 'bg-green-100 text-green-800'
    //                 : 'bg-red-100 text-red-800'
    //           }`}
    //         >
    //           {exampleProject.status}
    //         </div>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" size="icon">
    //               <MoveHorizontalIcon className="h-4 w-4" />
    //               <span className="sr-only">Project actions</span>
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end">
    //             <DropdownMenuItem>Edit</DropdownMenuItem>
    //             <DropdownMenuItem>Delete</DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </div>
    //     </div>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="grid gap-4">
    //       <div>
    //         <div className="text-sm font-medium text-muted-foreground">
    //           Description
    //         </div>
    //         <div>{exampleProject.description}</div>
    //       </div>
    //       <div className="grid grid-cols-2 gap-4">
    //         <div>
    //           <div className="text-sm font-medium text-muted-foreground">
    //             Start Date
    //           </div>
    //           <div>{exampleProject.startDate.toLocaleDateString()}</div>
    //         </div>
    //         <div>
    //           <div className="text-sm font-medium text-muted-foreground">
    //             End Date
    //           </div>
    //           <div>{exampleProject.endDate.toLocaleDateString()}</div>
    //         </div>
    //       </div>
    //       <div className="grid grid-cols-2 gap-4">
    //         <div>
    //           <div className="text-sm font-medium text-muted-foreground">
    //             Priority
    //           </div>
    //           <div>{exampleProject.priority}</div>
    //         </div>
    //         <div>
    //           <div className="text-sm font-medium text-muted-foreground">
    //             Budget
    //           </div>
    //           <div>${exampleProject.budget.toLocaleString()}</div>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="text-sm font-medium text-muted-foreground">
    //           Client
    //         </div>
    //         <div>{exampleProject.client}</div>
    //       </div>
    //       <div>
    //         <div className="text-sm font-medium text-muted-foreground">
    //           Assigned Users
    //         </div>
    //         <div className="flex gap-2">
    //           {exampleProject.assignedUsers.map((user) => (
    //             <Avatar key={user} className="h-8 w-8">
    //               <AvatarImage
    //                 src="/placeholder-user.jpg"
    //                 alt={`User ${user}`}
    //               />
    //               <AvatarFallback>
    //                 {user.slice(0, 2).toUpperCase()}
    //               </AvatarFallback>
    //             </Avatar>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </CardContent>
    //   <CardFooter className="flex justify-end">
    //     <Button variant="outline">View Tasks</Button>
    //     <Button className="ml-4">Edit Project</Button>
    //   </CardFooter>
    // </Card>
  );
};

export default SingleProject;
