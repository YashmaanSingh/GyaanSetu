export async function mockAuth({name, role}){
  // simulate network delay
  await new Promise(r=>setTimeout(r,500));
  return { id: Date.now(), name: name||('User'+Math.floor(Math.random()*1000)), role };
}

export async function fetchLessons(){
  await new Promise(r=>setTimeout(r,300));
  return [
    {id:1, title:'Intro to Computers', minutes:15},
    {id:2, title:'Internet Safety', minutes:10},
    {id:3, title:'Create Document', minutes:12},
  ];
}
