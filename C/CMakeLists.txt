cmake_minimum_required(VERSION 3.11.0)
project(Trivia VERSION 0.1.0 LANGUAGES C)

include(CTest)
enable_testing()

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_C_STANDARD 17)

add_compile_options(-g -Wall -Wextra -Werror)

add_executable(trivia game.c game_runner.c)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
