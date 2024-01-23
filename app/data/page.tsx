import Image from "next/image";

const Data = async () => {
  
const result = fetch('/api/controller/userList',{
  method:'GET',
  headers: {
    "Content-Type": "application/json",
  }
});
console.log((await result).status);

const response = fetch('/api/userID',{
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
});

if((await response).ok){
  const responseBody = (await response).json();
  console.log(responseBody);
}

  return (
    <div className="grid place-items-center">
      <h1 className="text-center text-4xl font-bold leading-20 text-zinc-800 mt-10 mb-10">
        Hey! Our Team had got your query. Soon we&apos;ll reach you
      </h1>
      <Image
        src="/smiley-emoji.png"
        alt="smiley-emoji"
        className="max-w-sm rounded-lg shadow-2xl"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Data;
