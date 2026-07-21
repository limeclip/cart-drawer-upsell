declare module "*.css";
declare module "*.css?module" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
