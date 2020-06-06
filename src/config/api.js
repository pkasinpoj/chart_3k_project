// const domain = "https://bigdata-3k.df.r.appspot.com";
const domain = "http://localhost:3001";
const v1 = "/api/v1/manage-all";

export const API = {
  DOMAIN: domain + v1,
  HOME: domain + v1 + "/home",
  HOME_COMPANY: domain + v1 + "/home-company",
  COMPANY: domain + v1 + "check-faculty-company",
  COMPANY_MOST: domain + v1 + "/check-most-faculty-company",
  COMPANY_LOW: domain + v1 + "/check-lowest-faculty-company",
  CHECK_FACULTY_UNIVERSITY: domain + v1 + "/checkfaculty-university",
  CHECK_ALL_YEAR: domain + v1 + "/checkAllyearInUniversity",
  CHECK_FACULTY_YEAR: domain + v1 + "/checkfaculty-year",
  CHECK_ALL_AMOUNT: domain + v1 + "/checkAllAmount-AllUniversity",
  CHECK_END_AMOUNT: domain + v1 + "/checkEndAmount-Year",
  UPLOAD_STUDENT: domain + v1 + "/upload-dataset-student",
  UPLOAD_COMPANY: domain + v1 + "/upload-dataset-company",
};
