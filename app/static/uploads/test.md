# Test Post

Let $X$ be a finite set. Give a recursive definition of the set of subsets
of $X$ (the Power set of $X$) $\mathcal{P}(X)$.
Use union as the operator on the definition

## Basis

$\mathcal{P}(\varnothing) = \{\varnothing\}$

## Recursive Step

Since the set is strictly finite, then by the definition of cardinality there exists a finite set $T = \\{1, 2, \dots, n\\}\subset \mathbb{N}$ and a one to one mapping $f$ from $T$ onto $X$ (since you can build a set with the same cardinality).

Let us denote by $X_{k}$ the set $\{f(1), f(2), \dots f(k)\}$ and let $X_{0} = \varnothing$. Then 
$$\mathcal{P}\left(X_{k}\right) = \mathcal{P}(X_{k-1}) \cup \\{P \cup \\{f(k)\\} | P\in\mathcal{P}(X_{k-1})\\},$$
meaning you can construct the powerset of $X_{k}$ by taking the union of the powerset of $X_{k-1}$ and the set of all the unions between the elements of $\mathcal{P}(X_{k-1})$ and the set containing the next element in $X$ (according to the order of our mapping). 

## Termination

A set $P$ is in $\mathcal{P}(X)$ if and only if it is obtainable from $\mathcal{P}(\varnothing)$ after a finite number of applications of the recursive step.