This is the source for a one hour presentation on d3 given at cBio at Memorial
Sloan Kettering Cancer Center.  You can find the few slides that there were
here: <www.gideond.com/d3-presentation>

It's not a perfect code example, but it demonstrates the use of d3's `enter`
selections as well as some basic javascript programming.

If you'd like to *run* this, grab the source `cd` into the directory and run

    python -m SimpleHTTPServer 8000

The data was taken from R standard data library like this:

    data('iris')
    write.table(iris, file='iris.txt', sep="      ", row.names=FALSE)
