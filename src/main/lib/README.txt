List of all dependencies that are not hosted in maven repository.
You have to install it in your local repository (see below for the install command).

 - ApprovalTests (http://approvaltests.sourceforge.net/)
      Unit testing asserts can be difficult to use. Approval tests simplify this by taking 
      a snapshot of the results, and confirming that they have not changed.

   Type this command in you console (in src/main/lib directory) to install ApprovalTests in you local repository:

mvn install:install-file -Dfile=ApprovalTests/ApprovalTests.jar -DgroupId=com.github.approvals -DartifactId=ApprovalTests -Dversion=0.13 -Dpackaging=jar -DgeneratePom=true