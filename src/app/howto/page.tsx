import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default async function HowToPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        How to Use the Inpainting Tool
      </h1>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="basics">The Basics</TabsTrigger>
          <TabsTrigger value="prompting">Effective Prompting</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="basics">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started with Inpainting</CardTitle>
              <CardDescription>
                Learn the fundamentals of using our inpainting tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    What is Inpainting?
                  </h3>
                  <p className="text-gray-600">
                    Inpainting is a technique that allows you to selectively
                    modify parts of an image by masking an area and generating
                    new content based on your prompt. It&apos;s perfect for
                    removing unwanted objects, changing elements, or making
                    creative edits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Step 1: Upload an Image
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start by uploading the image you want to edit. Supported
                      formats include JPG, PNG, and WebP.
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Button variant="outline">Upload Image</Button>
                      <p className="text-xs text-gray-500 mt-2">
                        Drag and drop or click to upload
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Step 2: Create a Mask
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Use the brush tool to paint over the area you want to
                      modify. You can adjust the brush size for precision.
                    </p>
                    <div className="relative h-40 w-full bg-gray-100 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Image preview with mask example
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Step 3: Enter Your Prompt
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Describe what you want to appear in the masked area. Be
                    specific and detailed for best results.
                  </p>
                  <Textarea
                    placeholder="Example: a golden retriever puppy sitting on grass"
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Step 4: Generate and Save
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click the generate button and wait for the AI to process
                    your request. Once complete, you can download the result or
                    continue editing.
                  </p>
                  <Button>Generate Inpainting</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompting">
          <Card>
            <CardHeader>
              <CardTitle>Effective Prompting Techniques</CardTitle>
              <CardDescription>
                Learn how to craft the perfect prompts for inpainting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    The Art of Prompting
                  </h3>
                  <p className="text-gray-600">
                    Your prompt is the most important factor in getting good
                    results. The AI needs clear instructions to understand what
                    you want in the masked area.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border border-green-200 bg-green-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-green-700 text-base">
                        Do's
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          Be specific and detailed (e.g., "a red ceramic vase
                          with white roses")
                        </li>
                        <li>
                          Include style descriptors (e.g., "photorealistic,"
                          "oil painting style")
                        </li>
                        <li>
                          Mention lighting conditions (e.g., "soft natural
                          lighting")
                        </li>
                        <li>
                          Specify perspective if needed (e.g., "front view,"
                          "aerial perspective")
                        </li>
                        <li>Consider context of the surrounding image</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border border-red-200 bg-red-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-red-700 text-base">
                        Don'ts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Use vague descriptions (e.g., "something nice")</li>
                        <li>Include too many competing concepts</li>
                        <li>Ignore the context of the original image</li>
                        <li>Use overly complex instructions</li>
                        <li>
                          Expect perfect text generation or specific faces
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Prompt Structure</h3>
                  <p className="text-gray-600 mb-4">
                    A well-structured prompt typically includes:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>
                      <strong>Subject:</strong> What you want to appear
                    </li>
                    <li>
                      <strong>Details:</strong> Specific attributes (color,
                      material, etc.)
                    </li>
                    <li>
                      <strong>Style:</strong> The artistic look or rendering
                      style
                    </li>
                    <li>
                      <strong>Lighting/Mood:</strong> Atmosphere and feeling
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Try It Yourself</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="e.g., a calico cat" />
                    </div>
                    <div>
                      <Label htmlFor="details">Details</Label>
                      <Input
                        id="details"
                        placeholder="e.g., sitting on a window sill, facing left"
                      />
                    </div>
                    <div>
                      <Label htmlFor="style">Style</Label>
                      <Input
                        id="style"
                        placeholder="e.g., photorealistic, digital art, watercolor"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lighting">Lighting/Mood</Label>
                      <Input
                        id="lighting"
                        placeholder="e.g., warm evening light, cozy atmosphere"
                      />
                    </div>
                    <div>
                      <Label htmlFor="combined">Combined Prompt</Label>
                      <Textarea
                        id="combined"
                        className="min-h-[80px]"
                        placeholder="Your complete prompt will appear here"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Example Gallery</CardTitle>
              <CardDescription>
                See real examples of inpainting in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Object Removal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Removing unwanted elements from a photo
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              Original image
                            </div>
                          </div>
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              After inpainting
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Prompt used:
                          </p>
                          <p className="text-sm p-2 bg-gray-50 rounded-md">
                            "Empty beach with sand and waves, natural lighting"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Background Replacement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Changing the setting behind a subject
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              Original image
                            </div>
                          </div>
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              After inpainting
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Prompt used:
                          </p>
                          <p className="text-sm p-2 bg-gray-50 rounded-md">
                            "Futuristic cityscape with glowing lights and flying
                            vehicles, cyberpunk style"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Style Transfer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Changing an object's appearance while keeping its
                          shape
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              Original image
                            </div>
                          </div>
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              After inpainting
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Prompt used:
                          </p>
                          <p className="text-sm p-2 bg-gray-50 rounded-md">
                            "A chair made of crystal glass, transparent with
                            rainbow light reflections"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Creative Additions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Adding new elements that weren't in the original
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              Original image
                            </div>
                          </div>
                          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              After inpainting
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Prompt used:
                          </p>
                          <p className="text-sm p-2 bg-gray-50 rounded-md">
                            "A magical glowing butterfly with blue and purple
                            wings, fantasy style, particle effects"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Tips from the Community
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "Try multiple prompts for the same mask to explore different possibilities",
                      "For difficult areas, try creating smaller, more precise masks",
                      "Use negative prompts to specify what you don't want to see",
                      "Match the lighting and perspective of the original image",
                      "Start simple and gradually add complexity to your prompts",
                      "Save your favorite prompts for future use",
                    ].map((tip, i) => (
                      <div
                        key={i}
                        className="bg-blue-50 border border-blue-100 p-3 rounded-lg"
                      >
                        <p className="text-sm text-blue-800">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">
          Need More Help?
        </h3>
        <p className="text-sm text-yellow-700">
          Visit our{" "}
          <span className="underline cursor-pointer">
            detailed documentation
          </span>{" "}
          or join our{" "}
          <span className="underline cursor-pointer">community forum</span> to
          connect with other users and share your inpainting creations.
        </p>
      </div>
    </div>
  );
}
