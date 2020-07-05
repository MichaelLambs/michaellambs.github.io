---
layout: post
title:  Persist Trix Editor in afterReflex() Using StimulusReflex.
date:   2020-06-27 17:41:19 -0600
author: Michael
# categories: jekyll update
---

I have a view that is utilizing both [StimulusJS](https://stimulusjs.org/), [Stimulus Reflex](https://docs.stimulusreflex.com/), and a [Trix Editor](https://trix-editor.org/). After a reflex the page is updating but it is not persisting the existing content inside the Trix Editor.

And sometimes, the reflex causes the Trix Editor to act in unexpected patterns - not displaying the toolbar or not allowing content to be added.

Here is my solution to persisting the Trix content, including formatting and uploads, after a StimulusReflex reflex. It was a lot easier than I expected.

## Code:
{% highlight javascript %}
// posts_controller.js
import ApplicationController from './application_controller'
import StimulusReflex from 'stimulus_reflex'

export default class extends ApplicationController {
  static targets = ['trix_holder'];

  connect() {
    StimulusReflex.register(this)
  }

  beforeReflex() {
    this.trixHtml = this.trix_holderTarget.innerHTML
  }

  afterReflex() {
    this.trix_holderTarget.innerHTML = this.trixHtml
  }
}
{% endhighlight %}

{% highlight haml %}
-# posts/form.haml
= simple_form_for(@post, url: post_path, data: { controller: "posts" }) do |f|
  .btn.btn-success.mb-2{ data: { reflex: 'click->PostReflex#some_action' } } Click Here
  .card-text.mt-3{ data: { target: 'posts.trix_holder' } }
    = f.rich_text_area :content, class: 'form-control', placeholder: 'Add post content here.'
{% endhighlight %}

## Explanation:
For the `posts_controller.js`, this is a Stimulus JS controller. And it follows the standard StimulusReflex setup.

`beforeReflex()` and `afterReflex()` are hooks in the StimulusReflex package that allow us to tie in right before and after a reflex takes place. Normally this is used for a spinner or loading ui.

{% highlight javascript %}
beforeReflex() {
  this.trixHtml = this.trix_holderTarget.innerHTML
}
{% endhighlight %}

This grabs the current innerHTML of the `{ data: { target: 'posts.trix_holder' } }`- which is a Stimulus target. This will give us everything that makes up the Trix Editor. Here is an example of what mine looks like in a `console.log()`

<div style="text-align:center;margin-bottom: 1rem;">
  <img src="/images/stimulusjs/trix-editor-persist-innerHTML-stimulusreflex.png" />
</div>

<!-- ![image](/images/stimulusjs/trix-editor-persist-innerHTML-stimulusreflex.png) -->

As you can see - this is a lot. These are all the html elements, including the current value, that makes up the Trix Editor. It also gets passed through as a string - which is exactly what we need.

We store this information as a Stimulus variable `this.trixHtml`.

Then `click->PostReflex#some_action` is performed.

Then we access `this.trixHtml` in the `afterReflex()` and set it to the innerHTML of the `this.trix_holderTarget`.

{% highlight javascript %}
afterReflex() {
  this.trix_holderTarget.innerHTML = this.trixHtml
}
{% endhighlight %}

This shoots the raw HTML of the Trix Editor from before the reflex takes place to the same `data-target` element after the reflex takes place.

This swap fixed my issue with Stimulus Reflex action affecting my Trix Editor.

## Conclusion:
This solution seemed like the easiest in my mind, but there may be other/better ways to pull this off. Leave a comment below with how you pulled off Trix content persisting after a StimuluReflex event.

{% highlight javascript %}
document.addEventListener('trix-change', function (e) {
  //save @post with ajax
})
{% endhighlight %}

Another way to pull this off would be to add an `addEventListener(‘trix-change’)` event on the Trix Editor and save the posts.content on every change. But that gets messy with non saved objects and validation.I hope you enjoyed this post. There will be more to come.

Michael
