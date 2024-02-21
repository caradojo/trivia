cmake_minimum_required(VERSION 3.5.0)
project(Trivia VERSION 0.1.0 LANGUAGES C CXX)

include(CTest)
enable_testing()

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 14)

add_compile_options(-g -Wall -Wextra -Werror)

add_executable(Trivia Game.cpp GameRunner.cpp)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
