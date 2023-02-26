# Test Post

Let $X$ be a finite set. Give a recursive definition of the set of subsets
of $X$ (the Power set of $X$) $\mathcal{P}(X)$.
Use union as the operator on the definition

## Basis

$\mathcal{P}(\varnothing) = \\{\varnothing\\}$

## Recursive Step

Since the set is finite, then by the definition of cardinality there exists a finite set $T = \\{1, 2, \dots, |X|\\}\subset \mathbb{N}$ and a one to one mapping $f$ from $T$ onto $X$ (since you can build a set with the same cardinality).

Let us denote by $X_{k}$ the set $\\{f(k) \ | \ 1 \leq k \leq |X|\\}$ and let $X_{0} = \varnothing$ by definition. Then

$$\mathcal{P}\left(X_{k}\right) = \mathcal{P}(X_{k-1}) \cup \\{P \cup \\{f(k)\\} \ | \ P\in\mathcal{P}(X_{k-1})\\}.$$  

## Termination

$$\mathcal{P}(X) = \mathcal{P}\left(X_{n}\right),$$
where $n = |X|$.

Since the set $X$ is a finite set, the previous equation implies that a set $P$ is in $\mathcal{P}(X)$ if and only if it is obtainable from $\mathcal{P}(\varnothing)$ after a finite number of applications of the recursive step.