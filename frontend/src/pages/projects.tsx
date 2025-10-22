
type User = {
    id: string;
    email : string
}



type Project = {
    Name : string;
    description : string
    owner : User
    members : User[]
    create_at : Date

}


export default function Project(props: Project)
{
    
    return (
          <ul className="border-base-content/25 divide-base-content/25 *:last:rounded-b-md divide-y rounded-md border *:p-3 *:first:rounded-t-md w-full" >
    <li className="flex items-start">
      <div className="avatar avatar-placeholder me-3">
        <div className="bg-info text-info-content w-10 rounded-lg">
          <span className="icon-[tabler--brand-tailwind] size-6"></span>
        </div>
      </div>
      <div className="grow">
        <h6 className="text-base text-base-content mb-2">{props.Name}</h6>
        <div className="progress h-2 w-full" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar progress-info w-1/2"></div>
        </div>
      </div>
    </li>
    
  </ul>
    );
}