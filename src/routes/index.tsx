i
m
p
o
r
t
 
{
 
u
s
e
M
e
m
o
,
 
u
s
e
S
t
a
t
e
 
}
 
f
r
o
m
 
"
r
e
a
c
t
"
;


i
m
p
o
r
t
 
{
 
c
r
e
a
t
e
F
i
l
e
R
o
u
t
e
,
 
u
s
e
N
a
v
i
g
a
t
e
 
}
 
f
r
o
m
 
"
@
t
a
n
s
t
a
c
k
/
r
e
a
c
t
-
r
o
u
t
e
r
"
;


i
m
p
o
r
t
 
{
 
B
a
r
C
h
a
r
t
3
,
 
C
a
l
e
n
d
a
r
D
a
y
s
,
 
F
i
l
e
T
e
x
t
,
 
H
i
s
t
o
r
y
,
 
P
e
n
c
i
l
,
 
P
l
u
s
,
 
S
e
t
t
i
n
g
s
2
,
 
S
t
o
r
e
 
a
s
 
S
t
o
r
e
I
c
o
n
,
 
T
r
a
s
h
2
 
}
 
f
r
o
m
 
"
l
u
c
i
d
e
-
r
e
a
c
t
"
;


i
m
p
o
r
t
 
{
 
t
o
a
s
t
 
}
 
f
r
o
m
 
"
s
o
n
n
e
r
"
;


i
m
p
o
r
t
 
{
 
B
u
t
t
o
n
 
}
 
f
r
o
m
 
"
@
/
c
o
m
p
o
n
e
n
t
s
/
u
i
/
b
u
t
t
o
n
"
;


i
m
p
o
r
t
 
{
 
D
i
a
l
o
g
,
 
D
i
a
l
o
g
C
o
n
t
e
n
t
,
 
D
i
a
l
o
g
D
e
s
c
r
i
p
t
i
o
n
,
 
D
i
a
l
o
g
F
o
o
t
e
r
,
 
D
i
a
l
o
g
H
e
a
d
e
r
,
 
D
i
a
l
o
g
T
i
t
l
e
 
}
 
f
r
o
m
 
"
@
/
c
o
m
p
o
n
e
n
t
s
/
u
i
/
d
i
a
l
o
g
"
;


i
m
p
o
r
t
 
{
 
A
l
e
r
t
D
i
a
l
o
g
,
 
A
l
e
r
t
D
i
a
l
o
g
A
c
t
i
o
n
,
 
A
l
e
r
t
D
i
a
l
o
g
C
a
n
c
e
l
,
 
A
l
e
r
t
D
i
a
l
o
g
C
o
n
t
e
n
t
,
 
A
l
e
r
t
D
i
a
l
o
g
D
e
s
c
r
i
p
t
i
o
n
,
 
A
l
e
r
t
D
i
a
l
o
g
F
o
o
t
e
r
,
 
A
l
e
r
t
D
i
a
l
o
g
H
e
a
d
e
r
,
 
A
l
e
r
t
D
i
a
l
o
g
T
i
t
l
e
 
}
 
f
r
o
m
 
"
@
/
c
o
m
p
o
n
e
n
t
s
/
u
i
/
a
l
e
r
t
-
d
i
a
l
o
g
"
;


i
m
p
o
r
t
 
{
 
I
n
p
u
t
 
}
 
f
r
o
m
 
"
@
/
c
o
m
p
o
n
e
n
t
s
/
u
i
/
i
n
p
u
t
"
;


i
m
p
o
r
t
 
{
 
L
a
b
e
l
 
}
 
f
r
o
m
 
"
@
/
c
o
m
p
o
n
e
n
t
s
/
u
i
/
l
a
b
e
l
"
;


i
m
p
o
r
t
 
{
 
u
s
e
A
p
p
S
t
o
r
e
 
}
 
f
r
o
m
 
"
@
/
l
i
b
/
a
p
p
-
s
t
o
r
e
"
;


i
m
p
o
r
t
 
t
y
p
e
 
{
 
S
t
o
r
e
 
}
 
f
r
o
m
 
"
@
/
l
i
b
/
t
y
p
e
s
"
;




e
x
p
o
r
t
 
c
o
n
s
t
 
R
o
u
t
e
 
=
 
c
r
e
a
t
e
F
i
l
e
R
o
u
t
e
(
"
/
"
)
(
{
 
c
o
m
p
o
n
e
n
t
:
 
H
o
m
e
 
}
)
;




f
u
n
c
t
i
o
n
 
s
t
a
r
t
O
f
D
a
y
(
t
s
:
 
n
u
m
b
e
r
)
 
{
 
c
o
n
s
t
 
d
 
=
 
n
e
w
 
D
a
t
e
(
t
s
)
;
 
r
e
t
u
r
n
 
n
e
w
 
D
a
t
e
(
d
.
g
e
t
F
u
l
l
Y
e
a
r
(
)
,
 
d
.
g
e
t
M
o
n
t
h
(
)
,
 
d
.
g
e
t
D
a
t
e
(
)
)
.
g
e
t
T
i
m
e
(
)
;
 
}


f
u
n
c
t
i
o
n
 
e
l
a
p
s
e
d
D
a
y
s
(
t
s
:
 
n
u
m
b
e
r
 
|
 
n
u
l
l
)
 
{
 
i
f
 
(
t
s
 
=
=
=
 
n
u
l
l
)
 
r
e
t
u
r
n
 
n
u
l
l
;
 
r
e
t
u
r
n
 
M
a
t
h
.
m
a
x
(
0
,
 
M
a
t
h
.
f
l
o
o
r
(
(
s
t
a
r
t
O
f
D
a
y
(
D
a
t
e
.
n
o
w
(
)
)
 
-
 
s
t
a
r
t
O
f
D
a
y
(
t
s
)
)
 
/
 
8
6
4
0
0
0
0
0
)
)
;
 
}


f
u
n
c
t
i
o
n
 
f
o
r
m
a
t
S
h
o
r
t
D
a
t
e
(
t
s
:
 
n
u
m
b
e
r
 
|
 
n
u
l
l
)
 
{
 
i
f
 
(
t
s
 
=
=
=
 
n
u
l
l
)
 
r
e
t
u
r
n
 
"
H
e
n
ü
z
 
z
i
y
a
r
e
t
 
y
o
k
"
;
 
r
e
t
u
r
n
 
n
e
w
 
D
a
t
e
(
t
s
)
.
t
o
L
o
c
a
l
e
D
a
t
e
S
t
r
i
n
g
(
"
t
r
-
T
R
"
)
;
 
}




f
u
n
c
t
i
o
n
 
H
o
m
e
(
)
 
{


 
 
c
o
n
s
t
 
n
a
v
i
g
a
t
e
 
=
 
u
s
e
N
a
v
i
g
a
t
e
(
)
;


 
 
c
o
n
s
t
 
s
t
o
r
e
s
 
=
 
u
s
e
A
p
p
S
t
o
r
e
(
(
s
)
 
=
>
 
s
.
s
t
o
r
e
s
)
;


 
 
c
o
n
s
t
 
v
i
s
i
t
s
 
=
 
u
s
e
A
p
p
S
t
o
r
e
(
(
s
)
 
=
>
 
s
.
v
i
s
i
t
s
)
;


 
 
c
o
n
s
t
 
a
d
d
S
t
o
r
e
 
=
 
u
s
e
A
p
p
S
t
o
r
e
(
(
s
)
 
=
>
 
s
.
a
d
d
S
t
o
r
e
)
;


 
 
c
o
n
s
t
 
r
e
n
a
m
e
S
t
o
r
e
 
=
 
u
s
e
A
p
p
S
t
o
r
e
(
(
s
)
 
=
>
 
s
.
r
e
n
a
m
e
S
t
o
r
e
)
;


 
 
c
o
n
s
t
 
d
e
l
e
t
e
S
t
o
r
e
 
=
 
u
s
e
A
p
p
S
t
o
r
e
(
(
s
)
 
=
>
 
s
.
d
e
l
e
t
e
S
t
o
r
e
)
;


 
 
c
o
n
s
t
 
c
r
e
a
t
e
V
i
s
i
t
 
=
 
u
s
e
A
p
p
S
t
o
r
e
(
(
s
)
 
=
>
 
s
.
c
r
e
a
t
e
V
i
s
i
t
)
;


 
 
c
o
n
s
t
 
[
a
d
d
O
p
e
n
,
 
s
e
t
A
d
d
O
p
e
n
]
 
=
 
u
s
e
S
t
a
t
e
(
f
a
l
s
e
)
;


 
 
c
o
n
s
t
 
[
n
e
w
N
a
m
e
,
 
s
e
t
N
e
w
N
a
m
e
]
 
=
 
u
s
e
S
t
a
t
e
(
"
"
)
;


 
 
c
o
n
s
t
 
[
r
e
n
a
m
e
T
a
r
g
e
t
,
 
s
e
t
R
e
n
a
m
e
T
a
r
g
e
t
]
 
=
 
u
s
e
S
t
a
t
e
<
S
t
o
r
e
 
|
 
n
u
l
l
>
(
n
u
l
l
)
;


 
 
c
o
n
s
t
 
[
r
e
n
a
m
e
V
a
l
u
e
,
 
s
e
t
R
e
n
a
m
e
V
a
l
u
e
]
 
=
 
u
s
e
S
t
a
t
e
(
"
"
)
;


 
 
c
o
n
s
t
 
[
d
e
l
e
t
e
T
a
r
g
e
t
,
 
s
e
t
D
e
l
e
t
e
T
a
r
g
e
t
]
 
=
 
u
s
e
S
t
a
t
e
<
S
t
o
r
e
 
|
 
n
u
l
l
>
(
n
u
l
l
)
;


 
 
c
o
n
s
t
 
o
r
d
e
r
e
d
 
=
 
u
s
e
M
e
m
o
(
(
)
 
=
>
 
[
.
.
.
s
t
o
r
e
s
]
.
s
o
r
t
(
(
a
,
 
b
)
 
=
>
 
a
.
o
r
d
e
r
 
-
 
b
.
o
r
d
e
r
)
,
 
[
s
t
o
r
e
s
]
)
;


 
 
c
o
n
s
t
 
r
o
w
s
 
=
 
u
s
e
M
e
m
o
(
(
)
 
=
>
 
o
r
d
e
r
e
d
.
m
a
p
(
(
s
t
o
r
e
)
 
=
>
 
{


 
 
 
 
c
o
n
s
t
 
l
a
s
t
 
=
 
v
i
s
i
t
s
.
f
i
l
t
e
r
(
(
v
)
 
=
>
 
v
.
s
t
o
r
e
I
d
 
=
=
=
 
s
t
o
r
e
.
i
d
)
.
s
o
r
t
(
(
a
,
 
b
)
 
=
>
 
b
.
c
r
e
a
t
e
d
A
t
 
-
 
a
.
c
r
e
a
t
e
d
A
t
)
[
0
]
;


 
 
 
 
c
o
n
s
t
 
d
a
y
s
 
=
 
e
l
a
p
s
e
d
D
a
y
s
(
l
a
s
t
?
.
c
r
e
a
t
e
d
A
t
 
?
?
 
n
u
l
l
)
;


 
 
 
 
c
o
n
s
t
 
s
t
a
t
u
s
 
=
 
d
a
y
s
 
=
=
=
 
0
 
?
 
"
t
o
d
a
y
"
 
:
 
d
a
y
s
 
!
=
=
 
n
u
l
l
 
&
&
 
d
a
y
s
 
<
=
 
3
 
?
 
"
n
o
r
m
a
l
"
 
:
 
"
o
v
e
r
d
u
e
"
;


 
 
 
 
r
e
t
u
r
n
 
{
 
s
t
o
r
e
,
 
l
a
s
t
,
 
d
a
y
s
,
 
s
t
a
t
u
s
 
}
;


 
 
}
)
,
 
[
o
r
d
e
r
e
d
,
 
v
i
s
i
t
s
]
)
;


 
 
c
o
n
s
t
 
o
v
e
r
d
u
e
C
o
u
n
t
 
=
 
r
o
w
s
.
f
i
l
t
e
r
(
(
r
)
 
=
>
 
r
.
s
t
a
t
u
s
 
=
=
=
 
"
o
v
e
r
d
u
e
"
)
.
l
e
n
g
t
h
;


 
 
c
o
n
s
t
 
o
n
T
i
m
e
C
o
u
n
t
 
=
 
r
o
w
s
.
l
e
n
g
t
h
 
-
 
o
v
e
r
d
u
e
C
o
u
n
t
;


 
 
f
u
n
c
t
i
o
n
 
s
t
a
r
t
V
i
s
i
t
(
s
t
o
r
e
:
 
S
t
o
r
e
)
 
{
 
c
o
n
s
t
 
v
i
s
i
t
 
=
 
c
r
e
a
t
e
V
i
s
i
t
(
s
t
o
r
e
.
i
d
)
;
 
i
f
 
(
!
v
i
s
i
t
)
 
r
e
t
u
r
n
;
 
t
o
a
s
t
.
s
u
c
c
e
s
s
(
`
$
{
s
t
o
r
e
.
n
a
m
e
}
 
·
 
$
{
v
i
s
i
t
.
n
u
m
b
e
r
}
.
 
z
i
y
a
r
e
t
 
a
ç
ı
l
d
ı
`
)
;
 
v
o
i
d
 
n
a
v
i
g
a
t
e
(
{
 
t
o
:
 
"
/
z
i
y
a
r
e
t
/
$
v
i
s
i
t
I
d
"
,
 
p
a
r
a
m
s
:
 
{
 
v
i
s
i
t
I
d
:
 
v
i
s
i
t
.
i
d
 
}
 
}
)
;
 
}


 
 
f
u
n
c
t
i
o
n
 
o
p
e
n
L
a
s
t
(
s
t
o
r
e
:
 
S
t
o
r
e
)
 
{
 
c
o
n
s
t
 
l
a
s
t
 
=
 
v
i
s
i
t
s
.
f
i
l
t
e
r
(
(
v
)
 
=
>
 
v
.
s
t
o
r
e
I
d
 
=
=
=
 
s
t
o
r
e
.
i
d
)
.
s
o
r
t
(
(
a
,
 
b
)
 
=
>
 
b
.
c
r
e
a
t
e
d
A
t
 
-
 
a
.
c
r
e
a
t
e
d
A
t
)
[
0
]
;
 
i
f
 
(
!
l
a
s
t
)
 
{
 
t
o
a
s
t
.
m
e
s
s
a
g
e
(
"
H
e
n
ü
z
 
z
i
y
a
r
e
t
 
y
o
k
"
)
;
 
r
e
t
u
r
n
;
 
}
 
v
o
i
d
 
n
a
v
i
g
a
t
e
(
{
 
t
o
:
 
"
/
z
i
y
a
r
e
t
/
$
v
i
s
i
t
I
d
"
,
 
p
a
r
a
m
s
:
 
{
 
v
i
s
i
t
I
d
:
 
l
a
s
t
.
i
d
 
}
 
}
)
;
 
}


 
 
f
u
n
c
t
i
o
n
 
s
u
b
m
i
t
A
d
d
(
)
 
{
 
c
o
n
s
t
 
n
a
m
e
 
=
 
n
e
w
N
a
m
e
.
t
r
i
m
(
)
;
 
i
f
 
(
!
n
a
m
e
)
 
r
e
t
u
r
n
;
 
c
o
n
s
t
 
s
t
o
r
e
 
=
 
a
d
d
S
t
o
r
e
(
n
a
m
e
)
;
 
s
e
t
A
d
d
O
p
e
n
(
f
a
l
s
e
)
;
 
s
e
t
N
e
w
N
a
m
e
(
"
"
)
;
 
t
o
a
s
t
.
s
u
c
c
e
s
s
(
`
$
{
s
t
o
r
e
.
n
a
m
e
}
 
e
k
l
e
n
d
i
`
)
;
 
}


 
 
f
u
n
c
t
i
o
n
 
s
u
b
m
i
t
R
e
n
a
m
e
(
)
 
{
 
i
f
 
(
!
r
e
n
a
m
e
T
a
r
g
e
t
)
 
r
e
t
u
r
n
;
 
r
e
n
a
m
e
S
t
o
r
e
(
r
e
n
a
m
e
T
a
r
g
e
t
.
i
d
,
 
r
e
n
a
m
e
V
a
l
u
e
)
;
 
s
e
t
R
e
n
a
m
e
T
a
r
g
e
t
(
n
u
l
l
)
;
 
t
o
a
s
t
.
s
u
c
c
e
s
s
(
"
M
a
ğ
a
z
a
 
a
d
ı
 
g
ü
n
c
e
l
l
e
n
d
i
"
)
;
 
}


 
 
r
e
t
u
r
n
 
(


 
 
 
 
<
m
a
i
n
 
c
l
a
s
s
N
a
m
e
=
"
m
x
-
a
u
t
o
 
m
i
n
-
h
-
d
v
h
 
m
a
x
-
w
-
5
x
l
 
p
x
-
4
 
p
b
-
2
8
 
s
m
:
p
x
-
6
"
 
s
t
y
l
e
=
{
{
 
p
a
d
d
i
n
g
T
o
p
:
 
"
m
a
x
(
1
r
e
m
,
 
e
n
v
(
s
a
f
e
-
a
r
e
a
-
i
n
s
e
t
-
t
o
p
)
)
"
 
}
}
>


 
 
 
 
 
 
<
h
e
a
d
e
r
 
c
l
a
s
s
N
a
m
e
=
"
p
t
-
2
"
>


 
 
 
 
 
 
 
 
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
i
t
e
m
s
-
c
e
n
t
e
r
 
j
u
s
t
i
f
y
-
b
e
t
w
e
e
n
 
g
a
p
-
3
"
>
<
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
i
n
l
i
n
e
-
f
l
e
x
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
2
"
>
<
s
p
a
n
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
x
l
 
b
g
-
[
#
e
3
0
6
1
3
]
 
p
x
-
3
 
p
y
-
1
.
5
 
t
e
x
t
-
l
g
 
f
o
n
t
-
b
l
a
c
k
 
t
r
a
c
k
i
n
g
-
t
i
g
h
t
 
t
e
x
t
-
w
h
i
t
e
"
>
B
İ
M
<
/
s
p
a
n
>
<
s
p
a
n
 
c
l
a
s
s
N
a
m
e
=
"
t
e
x
t
-
l
g
 
f
o
n
t
-
b
o
l
d
 
t
e
x
t
-
f
g
"
>
Z
i
y
a
r
e
t
<
/
s
p
a
n
>
<
/
d
i
v
>
<
h
1
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
4
 
t
e
x
t
-
2
x
l
 
f
o
n
t
-
b
o
l
d
 
t
r
a
c
k
i
n
g
-
t
i
g
h
t
 
t
e
x
t
-
f
g
"
>
M
a
ğ
a
z
a
 
S
e
ç
i
m
i
<
/
h
1
>
<
p
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
1
 
t
e
x
t
-
s
m
 
t
e
x
t
-
m
u
t
e
d
"
>
Z
i
y
a
r
e
t
 
e
t
m
e
k
 
i
s
t
e
d
i
ğ
i
n
i
z
 
m
a
ğ
a
z
a
y
ı
 
s
e
ç
i
n
<
/
p
>
<
/
d
i
v
>
<
B
u
t
t
o
n
 
v
a
r
i
a
n
t
=
"
o
u
t
l
i
n
e
"
 
s
i
z
e
=
"
i
c
o
n
"
 
a
r
i
a
-
l
a
b
e
l
=
"
A
y
a
r
l
a
r
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
n
a
v
i
g
a
t
e
(
{
 
t
o
:
 
"
/
s
a
b
l
o
n
"
 
}
)
}
>
<
S
e
t
t
i
n
g
s
2
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
4
"
 
/
>
<
/
B
u
t
t
o
n
>
<
/
d
i
v
>


 
 
 
 
 
 
 
 
<
s
e
c
t
i
o
n
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
5
 
g
r
i
d
 
g
r
i
d
-
c
o
l
s
-
3
 
g
a
p
-
2
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
2
x
l
 
b
o
r
d
e
r
 
b
o
r
d
e
r
-
b
o
r
d
e
r
 
b
g
-
s
u
r
f
a
c
e
 
p
-
3
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
2
 
t
e
x
t
-
x
s
 
f
o
n
t
-
m
e
d
i
u
m
 
t
e
x
t
-
m
u
t
e
d
"
>
<
C
a
l
e
n
d
a
r
D
a
y
s
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
4
"
 
/
>
B
u
g
ü
n
ü
n
 
T
a
r
i
h
i
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
2
 
t
e
x
t
-
b
a
s
e
 
f
o
n
t
-
b
o
l
d
 
t
e
x
t
-
f
g
"
>
{
n
e
w
 
D
a
t
e
(
)
.
t
o
L
o
c
a
l
e
D
a
t
e
S
t
r
i
n
g
(
"
t
r
-
T
R
"
)
}
<
/
d
i
v
>
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
2
x
l
 
b
o
r
d
e
r
 
b
o
r
d
e
r
-
b
o
r
d
e
r
 
b
g
-
s
u
r
f
a
c
e
 
p
-
3
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
t
e
x
t
-
x
s
 
f
o
n
t
-
m
e
d
i
u
m
 
t
e
x
t
-
m
u
t
e
d
"
>
T
o
p
l
a
m
 
M
a
ğ
a
z
a
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
2
 
t
e
x
t
-
2
x
l
 
f
o
n
t
-
b
o
l
d
 
t
e
x
t
-
f
g
"
>
{
r
o
w
s
.
l
e
n
g
t
h
}
<
/
d
i
v
>
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
2
x
l
 
b
o
r
d
e
r
 
b
o
r
d
e
r
-
b
o
r
d
e
r
 
b
g
-
s
u
r
f
a
c
e
 
p
-
3
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
t
e
x
t
-
x
s
 
f
o
n
t
-
m
e
d
i
u
m
 
t
e
x
t
-
m
u
t
e
d
"
>
Z
a
m
a
n
ı
n
d
a
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
2
 
t
e
x
t
-
2
x
l
 
f
o
n
t
-
b
o
l
d
 
t
e
x
t
-
f
g
"
>
{
o
n
T
i
m
e
C
o
u
n
t
}
<
/
d
i
v
>
<
/
d
i
v
>
<
/
s
e
c
t
i
o
n
>


 
 
 
 
 
 
 
 
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
3
 
g
r
i
d
 
g
r
i
d
-
c
o
l
s
-
2
 
g
a
p
-
2
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
2
x
l
 
b
o
r
d
e
r
 
b
o
r
d
e
r
-
r
e
d
-
2
0
0
 
b
g
-
r
e
d
-
5
0
 
p
-
3
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
t
e
x
t
-
x
s
 
f
o
n
t
-
s
e
m
i
b
o
l
d
 
t
e
x
t
-
r
e
d
-
7
0
0
"
>
4
 
G
ü
n
 
+
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
1
 
t
e
x
t
-
x
l
 
f
o
n
t
-
b
o
l
d
 
t
e
x
t
-
r
e
d
-
7
0
0
"
>
{
o
v
e
r
d
u
e
C
o
u
n
t
}
<
/
d
i
v
>
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
2
x
l
 
b
o
r
d
e
r
 
b
o
r
d
e
r
-
b
o
r
d
e
r
 
b
g
-
s
u
r
f
a
c
e
 
p
-
3
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
t
e
x
t
-
x
s
 
f
o
n
t
-
s
e
m
i
b
o
l
d
 
t
e
x
t
-
m
u
t
e
d
"
>
Z
a
m
a
n
ı
n
d
a
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
1
 
t
e
x
t
-
x
l
 
f
o
n
t
-
b
o
l
d
 
t
e
x
t
-
f
g
"
>
{
o
n
T
i
m
e
C
o
u
n
t
}
<
/
d
i
v
>
<
/
d
i
v
>
<
/
d
i
v
>


 
 
 
 
 
 
<
/
h
e
a
d
e
r
>


 
 
 
 
 
 
<
s
e
c
t
i
o
n
 
i
d
=
"
m
a
g
a
z
a
l
a
r
"
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
6
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
b
-
3
 
f
l
e
x
 
i
t
e
m
s
-
c
e
n
t
e
r
 
j
u
s
t
i
f
y
-
b
e
t
w
e
e
n
"
>
<
d
i
v
>
<
h
2
 
c
l
a
s
s
N
a
m
e
=
"
t
e
x
t
-
b
a
s
e
 
f
o
n
t
-
b
o
l
d
 
t
e
x
t
-
f
g
"
>
M
a
ğ
a
z
a
l
a
r
<
/
h
2
>
<
p
 
c
l
a
s
s
N
a
m
e
=
"
t
e
x
t
-
x
s
 
t
e
x
t
-
m
u
t
e
d
"
>
S
o
n
 
z
i
y
a
r
e
t
 
t
a
r
i
h
i
n
e
 
g
ö
r
e
 
d
u
r
u
m
<
/
p
>
<
/
d
i
v
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
s
e
t
A
d
d
O
p
e
n
(
t
r
u
e
)
}
 
c
l
a
s
s
N
a
m
e
=
"
i
n
l
i
n
e
-
f
l
e
x
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
1
 
r
o
u
n
d
e
d
-
x
l
 
b
o
r
d
e
r
 
b
o
r
d
e
r
-
b
o
r
d
e
r
 
p
x
-
3
 
p
y
-
2
 
t
e
x
t
-
x
s
 
f
o
n
t
-
s
e
m
i
b
o
l
d
 
t
e
x
t
-
f
g
"
>
<
P
l
u
s
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
4
"
 
/
>
M
a
ğ
a
z
a
 
e
k
l
e
<
/
b
u
t
t
o
n
>
<
/
d
i
v
>


 
 
 
 
 
 
 
 
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
g
r
i
d
 
g
r
i
d
-
c
o
l
s
-
2
 
g
a
p
-
3
 
s
m
:
g
r
i
d
-
c
o
l
s
-
3
"
>
{
r
o
w
s
.
m
a
p
(
(
{
 
s
t
o
r
e
,
 
l
a
s
t
,
 
d
a
y
s
,
 
s
t
a
t
u
s
 
}
)
 
=
>
 
{
 
c
o
n
s
t
 
c
a
r
d
C
l
a
s
s
 
=
 
s
t
a
t
u
s
 
=
=
=
 
"
t
o
d
a
y
"
 
?
 
"
b
o
r
d
e
r
-
e
m
e
r
a
l
d
-
3
0
0
 
b
g
-
e
m
e
r
a
l
d
-
5
0
"
 
:
 
s
t
a
t
u
s
 
=
=
=
 
"
o
v
e
r
d
u
e
"
 
?
 
"
b
o
r
d
e
r
-
r
e
d
-
3
0
0
 
b
g
-
r
e
d
-
5
0
"
 
:
 
"
b
o
r
d
e
r
-
b
o
r
d
e
r
 
b
g
-
s
u
r
f
a
c
e
"
;
 
c
o
n
s
t
 
t
i
t
l
e
C
l
a
s
s
 
=
 
s
t
a
t
u
s
 
=
=
=
 
"
t
o
d
a
y
"
 
?
 
"
t
e
x
t
-
e
m
e
r
a
l
d
-
8
0
0
"
 
:
 
s
t
a
t
u
s
 
=
=
=
 
"
o
v
e
r
d
u
e
"
 
?
 
"
t
e
x
t
-
r
e
d
-
8
0
0
"
 
:
 
"
t
e
x
t
-
f
g
"
;
 
r
e
t
u
r
n
 
<
a
r
t
i
c
l
e
 
k
e
y
=
{
s
t
o
r
e
.
i
d
}
 
c
l
a
s
s
N
a
m
e
=
{
`
r
o
u
n
d
e
d
-
2
x
l
 
b
o
r
d
e
r
 
p
-
3
 
s
h
a
d
o
w
-
s
m
 
$
{
c
a
r
d
C
l
a
s
s
}
`
}
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
i
t
e
m
s
-
s
t
a
r
t
 
j
u
s
t
i
f
y
-
b
e
t
w
e
e
n
 
g
a
p
-
2
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
i
n
-
w
-
0
"
>
<
h
3
 
c
l
a
s
s
N
a
m
e
=
{
`
t
r
u
n
c
a
t
e
 
t
e
x
t
-
s
m
 
f
o
n
t
-
b
o
l
d
 
$
{
t
i
t
l
e
C
l
a
s
s
}
`
}
>
{
s
t
o
r
e
.
n
a
m
e
}
<
/
h
3
>
<
p
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
1
 
t
e
x
t
-
[
1
1
p
x
]
 
t
e
x
t
-
m
u
t
e
d
"
>
S
o
n
 
z
i
y
a
r
e
t
:
 
{
f
o
r
m
a
t
S
h
o
r
t
D
a
t
e
(
l
a
s
t
?
.
c
r
e
a
t
e
d
A
t
 
?
?
 
n
u
l
l
)
}
<
/
p
>
<
/
d
i
v
>
<
S
t
o
r
e
I
c
o
n
 
c
l
a
s
s
N
a
m
e
=
{
`
s
i
z
e
-
4
 
s
h
r
i
n
k
-
0
 
$
{
t
i
t
l
e
C
l
a
s
s
}
`
}
 
/
>
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
{
`
m
t
-
2
 
t
e
x
t
-
x
s
 
f
o
n
t
-
s
e
m
i
b
o
l
d
 
$
{
t
i
t
l
e
C
l
a
s
s
}
`
}
>
{
d
a
y
s
 
=
=
=
 
n
u
l
l
 
?
 
"
H
e
n
ü
z
 
z
i
y
a
r
e
t
 
y
o
k
"
 
:
 
d
a
y
s
 
=
=
=
 
0
 
?
 
"
B
u
g
ü
n
 
z
i
y
a
r
e
t
 
e
d
i
l
d
i
"
 
:
 
`
$
{
d
a
y
s
}
 
g
ü
n
 
ö
n
c
e
`
}
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
3
 
g
r
i
d
 
g
r
i
d
-
c
o
l
s
-
2
 
g
a
p
-
1
.
5
"
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
s
t
a
r
t
V
i
s
i
t
(
s
t
o
r
e
)
}
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
x
l
 
b
g
-
i
n
k
 
p
x
-
2
 
p
y
-
2
 
t
e
x
t
-
[
1
1
p
x
]
 
f
o
n
t
-
s
e
m
i
b
o
l
d
 
t
e
x
t
-
w
h
i
t
e
"
>
Y
e
n
i
 
Z
i
y
a
r
e
t
<
/
b
u
t
t
o
n
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
o
p
e
n
L
a
s
t
(
s
t
o
r
e
)
}
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
x
l
 
b
o
r
d
e
r
 
b
o
r
d
e
r
-
b
o
r
d
e
r
 
b
g
-
w
h
i
t
e
/
7
0
 
p
x
-
2
 
p
y
-
2
 
t
e
x
t
-
[
1
1
p
x
]
 
f
o
n
t
-
s
e
m
i
b
o
l
d
 
t
e
x
t
-
f
g
"
>
S
o
n
 
Z
i
y
a
r
e
t
<
/
b
u
t
t
o
n
>
<
/
d
i
v
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
2
 
f
l
e
x
 
g
a
p
-
1
"
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
n
a
v
i
g
a
t
e
(
{
 
t
o
:
 
"
/
m
a
g
a
z
a
/
$
s
t
o
r
e
I
d
"
,
 
p
a
r
a
m
s
:
 
{
 
s
t
o
r
e
I
d
:
 
s
t
o
r
e
.
i
d
 
}
 
}
)
}
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
-
1
 
r
o
u
n
d
e
d
-
l
g
 
p
x
-
2
 
p
y
-
1
.
5
 
t
e
x
t
-
[
1
0
p
x
]
 
f
o
n
t
-
m
e
d
i
u
m
 
t
e
x
t
-
m
u
t
e
d
 
h
o
v
e
r
:
b
g
-
w
h
i
t
e
/
6
0
"
>
A
ç
<
/
b
u
t
t
o
n
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
{
 
s
e
t
R
e
n
a
m
e
T
a
r
g
e
t
(
s
t
o
r
e
)
;
 
s
e
t
R
e
n
a
m
e
V
a
l
u
e
(
s
t
o
r
e
.
n
a
m
e
)
;
 
}
}
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
l
g
 
p
-
1
.
5
 
t
e
x
t
-
m
u
t
e
d
 
h
o
v
e
r
:
b
g
-
w
h
i
t
e
/
6
0
"
>
<
P
e
n
c
i
l
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
3
.
5
"
 
/
>
<
/
b
u
t
t
o
n
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
s
e
t
D
e
l
e
t
e
T
a
r
g
e
t
(
s
t
o
r
e
)
}
 
c
l
a
s
s
N
a
m
e
=
"
r
o
u
n
d
e
d
-
l
g
 
p
-
1
.
5
 
t
e
x
t
-
m
u
t
e
d
 
h
o
v
e
r
:
b
g
-
w
h
i
t
e
/
6
0
"
>
<
T
r
a
s
h
2
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
3
.
5
"
 
/
>
<
/
b
u
t
t
o
n
>
<
/
d
i
v
>
<
/
a
r
t
i
c
l
e
>
;
 
}
)
}
<
/
d
i
v
>


 
 
 
 
 
 
<
/
s
e
c
t
i
o
n
>


 
 
 
 
 
 
<
s
e
c
t
i
o
n
 
c
l
a
s
s
N
a
m
e
=
"
m
t
-
4
 
r
o
u
n
d
e
d
-
2
x
l
 
b
o
r
d
e
r
 
b
o
r
d
e
r
-
b
o
r
d
e
r
 
b
g
-
s
u
r
f
a
c
e
 
p
-
3
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
f
l
e
x
-
w
r
a
p
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
x
-
5
 
g
a
p
-
y
-
2
 
t
e
x
t
-
x
s
 
t
e
x
t
-
m
u
t
e
d
"
>
<
s
p
a
n
 
c
l
a
s
s
N
a
m
e
=
"
i
n
l
i
n
e
-
f
l
e
x
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
2
"
>
<
s
p
a
n
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
3
 
r
o
u
n
d
e
d
-
f
u
l
l
 
b
g
-
e
m
e
r
a
l
d
-
5
0
0
"
 
/
>
B
u
g
ü
n
<
/
s
p
a
n
>
<
s
p
a
n
 
c
l
a
s
s
N
a
m
e
=
"
i
n
l
i
n
e
-
f
l
e
x
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
2
"
>
<
s
p
a
n
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
3
 
r
o
u
n
d
e
d
-
f
u
l
l
 
b
g
-
f
o
r
e
g
r
o
u
n
d
"
 
/
>
1
–
3
 
g
ü
n
<
/
s
p
a
n
>
<
s
p
a
n
 
c
l
a
s
s
N
a
m
e
=
"
i
n
l
i
n
e
-
f
l
e
x
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
2
"
>
<
s
p
a
n
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
3
 
r
o
u
n
d
e
d
-
f
u
l
l
 
b
g
-
r
e
d
-
5
0
0
"
 
/
>
4
 
g
ü
n
 
v
e
 
ü
z
e
r
i
<
/
s
p
a
n
>
<
/
d
i
v
>
<
/
s
e
c
t
i
o
n
>


 
 
 
 
 
 
<
n
a
v
 
c
l
a
s
s
N
a
m
e
=
"
f
i
x
e
d
 
i
n
s
e
t
-
x
-
0
 
b
o
t
t
o
m
-
0
 
z
-
3
0
 
b
o
r
d
e
r
-
t
 
b
o
r
d
e
r
-
b
o
r
d
e
r
 
b
g
-
b
a
c
k
g
r
o
u
n
d
/
9
5
 
p
x
-
3
 
p
b
-
[
m
a
x
(
0
.
5
r
e
m
,
e
n
v
(
s
a
f
e
-
a
r
e
a
-
i
n
s
e
t
-
b
o
t
t
o
m
)
)
]
 
p
t
-
2
 
b
a
c
k
d
r
o
p
-
b
l
u
r
"
>
<
d
i
v
 
c
l
a
s
s
N
a
m
e
=
"
m
x
-
a
u
t
o
 
g
r
i
d
 
m
a
x
-
w
-
5
x
l
 
g
r
i
d
-
c
o
l
s
-
5
 
i
t
e
m
s
-
e
n
d
 
g
a
p
-
1
"
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
"
m
a
g
a
z
a
l
a
r
"
)
?
.
s
c
r
o
l
l
I
n
t
o
V
i
e
w
(
{
 
b
e
h
a
v
i
o
r
:
 
"
s
m
o
o
t
h
"
 
}
)
}
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
f
l
e
x
-
c
o
l
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
1
 
r
o
u
n
d
e
d
-
x
l
 
p
x
-
2
 
p
y
-
1
.
5
 
t
e
x
t
-
[
1
0
p
x
]
 
f
o
n
t
-
s
e
m
i
b
o
l
d
 
t
e
x
t
-
f
g
"
>
<
S
t
o
r
e
I
c
o
n
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
5
"
 
/
>
M
a
ğ
a
z
a
l
a
r
<
/
b
u
t
t
o
n
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
t
o
a
s
t
.
m
e
s
s
a
g
e
(
"
G
e
ç
m
i
ş
 
e
k
r
a
n
ı
 
s
o
n
r
a
k
i
 
V
1
5
 
a
d
ı
m
ı
n
d
a
 
b
a
ğ
l
a
n
a
c
a
k
.
"
)
}
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
f
l
e
x
-
c
o
l
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
1
 
r
o
u
n
d
e
d
-
x
l
 
p
x
-
2
 
p
y
-
1
.
5
 
t
e
x
t
-
[
1
0
p
x
]
 
f
o
n
t
-
m
e
d
i
u
m
 
t
e
x
t
-
m
u
t
e
d
"
>
<
H
i
s
t
o
r
y
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
5
"
 
/
>
G
e
ç
m
i
ş
<
/
b
u
t
t
o
n
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
d
o
c
u
m
e
n
t
.
g
e
t
E
l
e
m
e
n
t
B
y
I
d
(
"
m
a
g
a
z
a
l
a
r
"
)
?
.
s
c
r
o
l
l
I
n
t
o
V
i
e
w
(
{
 
b
e
h
a
v
i
o
r
:
 
"
s
m
o
o
t
h
"
 
}
)
}
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
-
t
r
a
n
s
l
a
t
e
-
y
-
2
 
f
l
e
x
-
c
o
l
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
1
 
r
o
u
n
d
e
d
-
2
x
l
 
b
g
-
i
n
k
 
p
x
-
3
 
p
y
-
3
 
t
e
x
t
-
[
1
0
p
x
]
 
f
o
n
t
-
b
o
l
d
 
t
e
x
t
-
w
h
i
t
e
 
s
h
a
d
o
w
-
l
g
"
>
<
P
l
u
s
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
6
"
 
/
>
Y
e
n
i
 
Z
i
y
a
r
e
t
<
/
b
u
t
t
o
n
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
t
o
a
s
t
.
m
e
s
s
a
g
e
(
"
R
a
p
o
r
l
a
r
 
e
k
r
a
n
ı
 
s
o
n
r
a
k
i
 
V
1
5
 
a
d
ı
m
ı
n
d
a
 
b
a
ğ
l
a
n
a
c
a
k
.
"
)
}
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
f
l
e
x
-
c
o
l
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
1
 
r
o
u
n
d
e
d
-
x
l
 
p
x
-
2
 
p
y
-
1
.
5
 
t
e
x
t
-
[
1
0
p
x
]
 
f
o
n
t
-
m
e
d
i
u
m
 
t
e
x
t
-
m
u
t
e
d
"
>
<
B
a
r
C
h
a
r
t
3
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
5
"
 
/
>
R
a
p
o
r
l
a
r
<
/
b
u
t
t
o
n
>
<
b
u
t
t
o
n
 
t
y
p
e
=
"
b
u
t
t
o
n
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
n
a
v
i
g
a
t
e
(
{
 
t
o
:
 
"
/
s
a
b
l
o
n
"
 
}
)
}
 
c
l
a
s
s
N
a
m
e
=
"
f
l
e
x
 
f
l
e
x
-
c
o
l
 
i
t
e
m
s
-
c
e
n
t
e
r
 
g
a
p
-
1
 
r
o
u
n
d
e
d
-
x
l
 
p
x
-
2
 
p
y
-
1
.
5
 
t
e
x
t
-
[
1
0
p
x
]
 
f
o
n
t
-
m
e
d
i
u
m
 
t
e
x
t
-
m
u
t
e
d
"
>
<
F
i
l
e
T
e
x
t
 
c
l
a
s
s
N
a
m
e
=
"
s
i
z
e
-
5
"
 
/
>
A
y
a
r
l
a
r
<
/
b
u
t
t
o
n
>
<
/
d
i
v
>
<
/
n
a
v
>


 
 
 
 
 
 
<
D
i
a
l
o
g
 
o
p
e
n
=
{
a
d
d
O
p
e
n
}
 
o
n
O
p
e
n
C
h
a
n
g
e
=
{
s
e
t
A
d
d
O
p
e
n
}
>
<
D
i
a
l
o
g
C
o
n
t
e
n
t
>
<
D
i
a
l
o
g
H
e
a
d
e
r
>
<
D
i
a
l
o
g
T
i
t
l
e
>
Y
e
n
i
 
m
a
ğ
a
z
a
<
/
D
i
a
l
o
g
T
i
t
l
e
>
<
D
i
a
l
o
g
D
e
s
c
r
i
p
t
i
o
n
>
L
i
s
t
e
y
e
 
y
e
n
i
 
b
i
r
 
m
a
ğ
a
z
a
 
e
k
l
e
r
.
 
Ş
a
b
l
o
n
 
t
ü
m
 
m
a
ğ
a
z
a
l
a
r
d
a
 
o
r
t
a
k
t
ı
r
.
<
/
D
i
a
l
o
g
D
e
s
c
r
i
p
t
i
o
n
>
<
/
D
i
a
l
o
g
H
e
a
d
e
r
>
<
L
a
b
e
l
 
h
t
m
l
F
o
r
=
"
s
t
o
r
e
-
n
a
m
e
"
>
M
a
ğ
a
z
a
 
a
d
ı
<
/
L
a
b
e
l
>
<
I
n
p
u
t
 
i
d
=
"
s
t
o
r
e
-
n
a
m
e
"
 
v
a
l
u
e
=
{
n
e
w
N
a
m
e
}
 
o
n
C
h
a
n
g
e
=
{
(
e
)
 
=
>
 
s
e
t
N
e
w
N
a
m
e
(
e
.
t
a
r
g
e
t
.
v
a
l
u
e
)
}
 
p
l
a
c
e
h
o
l
d
e
r
=
"
Ö
r
n
.
 
Y
E
N
İ
 
M
A
H
A
L
L
E
"
 
a
u
t
o
F
o
c
u
s
 
o
n
K
e
y
D
o
w
n
=
{
(
e
)
 
=
>
 
{
 
i
f
 
(
e
.
k
e
y
 
=
=
=
 
"
E
n
t
e
r
"
)
 
s
u
b
m
i
t
A
d
d
(
)
;
 
}
}
 
/
>
<
D
i
a
l
o
g
F
o
o
t
e
r
>
<
B
u
t
t
o
n
 
v
a
r
i
a
n
t
=
"
o
u
t
l
i
n
e
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
s
e
t
A
d
d
O
p
e
n
(
f
a
l
s
e
)
}
>
V
a
z
g
e
ç
<
/
B
u
t
t
o
n
>
<
B
u
t
t
o
n
 
v
a
r
i
a
n
t
=
"
i
n
k
"
 
o
n
C
l
i
c
k
=
{
s
u
b
m
i
t
A
d
d
}
>
E
k
l
e
<
/
B
u
t
t
o
n
>
<
/
D
i
a
l
o
g
F
o
o
t
e
r
>
<
/
D
i
a
l
o
g
C
o
n
t
e
n
t
>
<
/
D
i
a
l
o
g
>


 
 
 
 
 
 
<
D
i
a
l
o
g
 
o
p
e
n
=
{
B
o
o
l
e
a
n
(
r
e
n
a
m
e
T
a
r
g
e
t
)
}
 
o
n
O
p
e
n
C
h
a
n
g
e
=
{
(
o
)
 
=
>
 
!
o
 
&
&
 
s
e
t
R
e
n
a
m
e
T
a
r
g
e
t
(
n
u
l
l
)
}
>
<
D
i
a
l
o
g
C
o
n
t
e
n
t
>
<
D
i
a
l
o
g
H
e
a
d
e
r
>
<
D
i
a
l
o
g
T
i
t
l
e
>
M
a
ğ
a
z
a
y
ı
 
y
e
n
i
d
e
n
 
a
d
l
a
n
d
ı
r
<
/
D
i
a
l
o
g
T
i
t
l
e
>
<
/
D
i
a
l
o
g
H
e
a
d
e
r
>
<
I
n
p
u
t
 
v
a
l
u
e
=
{
r
e
n
a
m
e
V
a
l
u
e
}
 
o
n
C
h
a
n
g
e
=
{
(
e
)
 
=
>
 
s
e
t
R
e
n
a
m
e
V
a
l
u
e
(
e
.
t
a
r
g
e
t
.
v
a
l
u
e
)
}
 
a
u
t
o
F
o
c
u
s
 
o
n
K
e
y
D
o
w
n
=
{
(
e
)
 
=
>
 
{
 
i
f
 
(
e
.
k
e
y
 
=
=
=
 
"
E
n
t
e
r
"
)
 
s
u
b
m
i
t
R
e
n
a
m
e
(
)
;
 
}
}
 
/
>
<
D
i
a
l
o
g
F
o
o
t
e
r
>
<
B
u
t
t
o
n
 
v
a
r
i
a
n
t
=
"
o
u
t
l
i
n
e
"
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
s
e
t
R
e
n
a
m
e
T
a
r
g
e
t
(
n
u
l
l
)
}
>
V
a
z
g
e
ç
<
/
B
u
t
t
o
n
>
<
B
u
t
t
o
n
 
v
a
r
i
a
n
t
=
"
i
n
k
"
 
o
n
C
l
i
c
k
=
{
s
u
b
m
i
t
R
e
n
a
m
e
}
>
K
a
y
d
e
t
<
/
B
u
t
t
o
n
>
<
/
D
i
a
l
o
g
F
o
o
t
e
r
>
<
/
D
i
a
l
o
g
C
o
n
t
e
n
t
>
<
/
D
i
a
l
o
g
>


 
 
 
 
 
 
<
A
l
e
r
t
D
i
a
l
o
g
 
o
p
e
n
=
{
B
o
o
l
e
a
n
(
d
e
l
e
t
e
T
a
r
g
e
t
)
}
 
o
n
O
p
e
n
C
h
a
n
g
e
=
{
(
o
)
 
=
>
 
!
o
 
&
&
 
s
e
t
D
e
l
e
t
e
T
a
r
g
e
t
(
n
u
l
l
)
}
>
<
A
l
e
r
t
D
i
a
l
o
g
C
o
n
t
e
n
t
>
<
A
l
e
r
t
D
i
a
l
o
g
H
e
a
d
e
r
>
<
A
l
e
r
t
D
i
a
l
o
g
T
i
t
l
e
>
M
a
ğ
a
z
a
 
s
i
l
i
n
s
i
n
 
m
i
?
<
/
A
l
e
r
t
D
i
a
l
o
g
T
i
t
l
e
>
<
A
l
e
r
t
D
i
a
l
o
g
D
e
s
c
r
i
p
t
i
o
n
>
{
d
e
l
e
t
e
T
a
r
g
e
t
?
.
n
a
m
e
}
 
v
e
 
b
u
 
m
a
ğ
a
z
a
y
a
 
a
i
t
 
t
ü
m
 
z
i
y
a
r
e
t
 
r
a
p
o
r
l
a
r
ı
 
k
a
l
ı
c
ı
 
o
l
a
r
a
k
 
s
i
l
i
n
i
r
.
<
/
A
l
e
r
t
D
i
a
l
o
g
D
e
s
c
r
i
p
t
i
o
n
>
<
/
A
l
e
r
t
D
i
a
l
o
g
H
e
a
d
e
r
>
<
A
l
e
r
t
D
i
a
l
o
g
F
o
o
t
e
r
>
<
A
l
e
r
t
D
i
a
l
o
g
C
a
n
c
e
l
>
V
a
z
g
e
ç
<
/
A
l
e
r
t
D
i
a
l
o
g
C
a
n
c
e
l
>
<
A
l
e
r
t
D
i
a
l
o
g
A
c
t
i
o
n
 
o
n
C
l
i
c
k
=
{
(
)
 
=
>
 
{
 
i
f
 
(
d
e
l
e
t
e
T
a
r
g
e
t
)
 
{
 
d
e
l
e
t
e
S
t
o
r
e
(
d
e
l
e
t
e
T
a
r
g
e
t
.
i
d
)
;
 
t
o
a
s
t
.
s
u
c
c
e
s
s
(
"
M
a
ğ
a
z
a
 
s
i
l
i
n
d
i
"
)
;
 
}
 
s
e
t
D
e
l
e
t
e
T
a
r
g
e
t
(
n
u
l
l
)
;
 
}
}
>
S
i
l
<
/
A
l
e
r
t
D
i
a
l
o
g
A
c
t
i
o
n
>
<
/
A
l
e
r
t
D
i
a
l
o
g
F
o
o
t
e
r
>
<
/
A
l
e
r
t
D
i
a
l
o
g
C
o
n
t
e
n
t
>
<
/
A
l
e
r
t
D
i
a
l
o
g
>


 
 
 
 
<
/
m
a
i
n
>


 
 
)
;


}