import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CourseCard from "./CourseCard";
import { Pagination } from "react-headless-pagination";
import { fetchCourseInfosByPage, fetchFCEInfos } from "../app/courses";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Loading from "./Loading";

const CoursePage = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.courses.results);
  const showFCEs = useAppSelector((state) => state.user.showFCEs);
  const showCourseInfos = useAppSelector((state) => state.user.showCourseInfos);
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  useEffect(() => {
    if (loggedIn && results) {
      dispatch(
        fetchFCEInfos({ courseIDs: results.map((course) => course.courseID) })
      );
    }
  }, [results, loggedIn]);

  return (
    <div className="space-y-4">
      {results &&
        results.map((course) => (
          <CourseCard
            info={course}
            key={course.courseID}
            showFCEs={showFCEs}
            showCourseInfo={showCourseInfos}
          />
        ))}
    </div>
  );
};

const CourseList = () => {
  const pages = useAppSelector((state) => state.courses.totalPages);
  const curPage = useAppSelector((state) => state.courses.page);
  const loading = useAppSelector((state) => state.courses.coursesLoading);
  const dispatch = useAppDispatch();

  const handlePageClick = (page) => {
    dispatch(fetchCourseInfosByPage(page + 1));
  };

  return (
    <div className="p-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <CoursePage />
          <div className="mx-auto my-6">
            <Pagination
              currentPage={curPage - 1}
              setCurrentPage={handlePageClick}
              totalPages={pages}
              className="flex w-full justify-center"
            >
              <Pagination.PrevButton className="">
                <ChevronLeftIcon className="h-5 w-5 dark:stroke-grey-50" />
              </Pagination.PrevButton>

              <div className="flex items-center align-baseline">
                <Pagination.PageButton
                  activeClassName="bg-grey-200 dark:bg-grey-600"
                  inactiveClassName=""
                  className="mx-3 inline-flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-white dark:text-grey-50"
                />
              </div>

              <Pagination.NextButton>
                <ChevronRightIcon className="h-5 w-5 dark:stroke-grey-50" />
              </Pagination.NextButton>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseList;
