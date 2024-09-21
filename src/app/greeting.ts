interface Greeting {
    name: string;
    age: number;
    format?: 'Table' | 'Default';
  }
  
  function greeting(user: Greeting) {
    if (user.format == 'Table') {
      console.table(user);
    } else if (user.format == 'Default' || user.format) {
      console.log(`Hi !! :${user.name} 
           Your old : ${user.age} years old.`);
    } else if (
      user.format != 'Defualt' &&
      user.format != 'Table' &&
      user.format
    ) {
      throw new Error('Invalid format');
    }
  }
  greeting({
    name: 'Alice',
    age: 18,
    format: 'Table',
  });
  greeting({
    name: 'Bob',
    age: 18,
    format: 'Default',
  });
  
  greeting({
    name: 'Charlie',
    age: 18,
  });
  
  greeting({
    name: 'Cherline',
    age: 18,
    // format: 'asdfbh',
  });
  

//   interface GreetingParams {
//     name: string
//     age: number
//     format: PrintFormat
//   }
//   type PrintFormat = "Default" | "Table"
  
  
//   // หลอก Compiler, TypeScript ว่ามี format
//   function greeting(params: GreetingParams) {
//     if (params.format === "Table") {
//         console.table({
//             name: params.name,
//             age: params.age
//         })
//     }
//     if (params.format === "Default") {
//         return "Hi, " + params.name
//     }
//   }
//   test("Display default", () => {
//     const data = {
//       name: "Alice",
//       format: "Default"
//     } as GreetingParams
//     const result = greeting(data);
//     expect(result).toEqual("Hi, Alice")
//   }) 