import type { AuthUser } from "../services/AuthProvider";
import { useAuth } from "../services/useAuth";

type User = {
    email : string
    role : string 
}



type Project = {
    id?: string
    Name : string;
    description : string
    owner? : AuthUser | null 
    members? : User[]
    create_at : Date

}


function Project(props: Project)
{
    
    return (
         <> <title> {props.Name} </title>
         </> 
    );
}


type ProjectListProps = {
    projects: Project[]
}

function ProjectList({ projects }: ProjectListProps)
{
    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>owner</th>
        <th>create at</th>
      </tr>
    </thead>
    <tbody>
     {projects.map((project : Project, index: number)=> 
        <tr key={project.id ?? index} className="hover:bg-base-300" > 
            <td>{project.Name}</td>
            <td>{project.description}</td>
            <td>{project.owner?.email}</td>
            <td>{project.create_at.getDate()}</td>
        </tr>
        )}
    </tbody>
  </table>
</div>
    );
}


export function ProjectPage()
{
    const {user} = useAuth() 
    const Projects : Project[] = [
        {Name:'project 1', description: 'desc', owner: user ,create_at : new Date() },
        {Name:'project 1', description: 'desc', owner: user ,create_at : new Date() },
        {Name:'project 1', description: 'desc', owner: user ,create_at : new Date() },
        {Name:'project 1', description: 'desc', owner: user ,create_at : new Date() },
        {Name:'project 1', description: 'desc', owner: user ,create_at : new Date() }
    ]

    return (
        <ProjectList projects={Projects} />
    )
}
