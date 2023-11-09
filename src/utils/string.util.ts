// export function convert text to code with underscore: ex: "Hello world" => "hello_world"

export function convertTextToCodeWithUnderscore(text: string): string {
  return text.replace(/\s+/g, '_').toLowerCase();
}
