import { Content } from "./content"

describe("Notification Content", () =>{
  it("should be able to create notification content", ()=>{
    const randomNumber = Math.random() * (240 - 5) + 5;
  
    expect(() => new Content("a".repeat(randomNumber))).toBeTruthy();
  });
  
  it("should not to be able to create notification content with less than 5 characteres", ()=>{
    expect(() => new Content("aaa")).toThrow();
  });
  
  it("should not to be able to create notification content with more than 240 characteres", ()=>{
    expect(() => new Content("a".repeat(241))).toThrow();
  });
});