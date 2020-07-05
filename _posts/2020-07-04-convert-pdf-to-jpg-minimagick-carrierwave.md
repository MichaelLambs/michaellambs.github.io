---
layout: post
title:  Convert The First Page of a PDF into JPG with MiniMagick
date:   2020-07-04 17:41:19 -0600
author: Michael
---
## Problem:
I was assigned the task of allowing a user to upload a PDF then set that PDF as a background image via css.

Obviously we cannot set the PDF as a background image so I needed to do some converting.

After converting the file, it needed to be uploaded to our S3 Bucket for future use.

We are already using the [MiniMagick](https://github.com/minimagick/minimagick){:target="_blank"} gem and it comes with this functionality.

But it took a chunk of time searching for a solution. So I decided to write up my own hoping that it will help someone in the future.

## Code:
{% highlight ruby %}
def convert_pdf_to_jpg
  uuid = SecureRandom.uuid
  converted_name = pdf_file_name.chomp('.pdf') + '.jpg'
  tmp_file_path = "#{Rails.root}/tmp/#{converted_name}"

  pdf = MiniMagick::Image.open(your_s3_bucket_url)

  MiniMagick::Tool::Convert.new do |convert|
    convert << pdf.pages.first.path # grabs only the first page
    convert.background "white"
    convert.flatten
    convert.density 150
    convert.quality 100
    convert << tmp_file_path # converts and writes the new file
  end

  new_attachment = SomeModel.new
  new_attachment.file = File.open(tmp_file_path)
  new_attachment.file_key = "uploads/attachment/photo/#{uuid}/#{converted_name}" # this sets the correct path on s3
  new_attachment.save

  File.delete(tmp_file_path) # delete the temp file after pushed up.
end
{% endhighlight %}

## Explanation:
The first thing you'll need to do is get the convert the name of the file from `file_name.pdf` to `file_name.jpg`. There are many ways to pull this off. But above I am using a `chomp` that removes the `'.pdf'` from the file_name string and adds the extension `'.jpg'` to the end.

{% highlight ruby %}
'file_name.pdf'.chomp('.pdf') + '.jpg' # = 'file_name.jpg'
{% endhighlight %}

Or you can name it whatever you like as long as it ends in `'.jpg'`.

Then next thing is that you'll want to define a temporary file path. This is where you'll save the converted image before uploading it.

Using `MiniMagick::Image.open()` you can open the existing PDF file from an external url. For me this was an S3 url.

Now that you have the PDF, we can do some converting!

{% highlight ruby %}
  MiniMagick::Tool::Convert.new do |convert|
    convert << pdf.pages.first.path # grabs only the first page
    convert.background "white"
    convert.flatten
    convert.density 150
    convert.quality 100
    convert << tmp_file_path # converts and writes the new file
  end
{% endhighlight %}

The most important lines are first `convert << pdf.pages.first.path` and last `convert << tmp_file_path`.

`convert << pdf.pages.first.path` grabs the first page of the PDF. [You can loop through and create a JPG for every page](https://github.com/minimagick/minimagick/issues/288#issuecomment-75072516){:target="_blank"}. But that is out of this scope since I was looking for a single image for a background.

`convert << tmp_file_path` is the line that writes the converted file to the `tmp_file_path` previously set. This is the line that actually writes/saves the converted file. It took me a long while to figure that out...

And in-between those two commands there are a lot of `convert.` [options](https://imagemagick.org/script/convert.php){:target="_blank"} that you can use. 

Now we have the converted file at the variable `tmp_file_path`.

You can do whatever you like. `File.open(tmp_file_path)` will open the file to save onto your model. Then set a `file_key` for your correct S3 location.

The final step is after you have pushed the file up or done something with it. Make sure to delete the temp file. Since we do not want to keep duplicates.

You do this by calling `File.delete(tmp_file_path)`.

## Conclusion:
I hope this helped you on your path of converting a PDF to JPG.

And honestly it can also be converted into a PNG, by simply changing the file extension from `'.jpg'` to `'.png'`.

If you know of a better way, please let me know!

Michael

## References:
The many links I used to solve this problem.
1. [https://github.com/minimagick/minimagick](https://github.com/minimagick/minimagick){:target="_blank"}
2. [https://imagemagick.org/script/convert.php](https://imagemagick.org/script/convert.php){:target="_blank"}
3. [https://groups.google.com/forum/#!topic/ruby-shrine/wMNnOs6SxLY](https://groups.google.com/forum/#!topic/ruby-shrine/wMNnOs6SxLY){:target="_blank"}
4. [https://github.com/minimagick/minimagick/issues/288](https://github.com/minimagick/minimagick/issues/288){:target="_blank"}
5. [https://stackoverflow.com/questions/16772471/carrierwave-pdf-only-choose-the-first-page](https://stackoverflow.com/questions/16772471/carrierwave-pdf-only-choose-the-first-page){:target="_blank"}
6. [https://github.com/carrierwaveuploader/carrierwave/pull/691](https://github.com/carrierwaveuploader/carrierwave/pull/691){:target="_blank"}
7. [https://medium.com/@pk60905/use-carrierwave-to-upload-files-to-s3-81ce79c29b6d](https://medium.com/@pk60905/use-carrierwave-to-upload-files-to-s3-81ce79c29b6d){:target="_blank"}