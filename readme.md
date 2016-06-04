# Click Jump

A point-and-click platformer prototype for 04/23/16 weekend.

## Version 0.0.1

This is a separate repository. [I did this before.](https://github.com/ksiondag/click_platformer)

It was a hacked together thing to see if it could work at all. I played with
it, and still think it could be a super cool game.

## Version 0.0.2

That's this repo. Further iterations may come from this repo, or it may come
from new ones. Considering how I want the game to be a Wuxia-inspired game, and
need better collision detection and such plus the jumping, I'm thinking a
proper MVP will have some sword mechanics and jump mechanics interwoven into
something super fun to play with.

So, this is just further playing with the jump mechanics, and I may have a
separate set of repos for playing with the sword mechanics, before finally
merging into a 1.0.0 setup where the first real game is made.

### Post-Mortem for version 0.0.2

Jumping is awkward and a playtester pointed out exactly what was wrong, a
player intuitively feels like the apex of the jump should intersect with the
center of the player entity, but instead intersects with the bottom, causing
an overshoot effect. Which, you know, there's a reason that a center is called
a "center of gravity". And it seems there's a natural instinct for it even in
an abstract toy such as this.

Further, speed is way too exponential. The reason this is the case is because
the apex jump calculation assumes a constant gravity, calculates a y velocity
for the proper apex, and makes sure the x velocity will intersect the desired
x coordinate. Because of this logic, a click far from the player entity but not
high above the player leads to a super fast jump across the screen. Sometimes
fast enough to just fly right out of bounds.

A setup that feels a little better is a linearly increasing x velocity based
off of the dx, calculating the dt based on that vx and dx, and then calculating
the necessary vy and ay (aka gravity) to make it the proper apex of the jump.

I've added some edits (commented out) to the jump physics such that in a future
iteration it'll be a quick fix to make jumping based off the center of gravity
instead of the bottom of the player entity, and that the speed of jumping will
instead linearly grow based on the jump distance.

The next iteration should probably be an actual level with an end goal. I think
moving platforms and should be the main draw. I like the "blossoms" in this,
and will try to have them in the next game, with a wind-like effect on them.

Adding little bits of charm like that as the toy becomes a game will really
give the final game a lot of charm, I think.

Further work on the start menu would also be good. I like the direction its
going, but I don't think I want the block to stop the player entity's momentum.
I want the player to pass the button, have that start button disappear, and
then have the player jump onto the next scene, be it the first level or more
options.

Before I do another jumping iteration, though, I've been itching to work on a
multiple hitbox based player entity with a sword that can slice or bounce away
objects based on the duration of the click.

With my naming history... "clickslash"?

