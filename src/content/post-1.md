---
title: "This is such a long headline and i dont know what to write so i keep continiung"
date: "2019-03-17"
draft: false
path: "/blog/example-title"
tags:
  - "mobx"
---
# H1

## H2

### H3

#### H4

##### H5

###### H6

Paragraph

---

> This is a quote
> 인용
---

[Example.com](example.com)

---

`const foo = bar`

```javascript {1}
const foo = bar
console.log(foo);
```

```jsx:title=src/components/blog.tsx {2,4-5}
import React from "react";
const Blog = ({ posts }: PostsProps) => {
  const { tagsPath, basePath } = useSiteMetadata();
  return (
    <Layout>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <Heading variant="h2" as="h2">
          Blog
        </Heading>
        <Styled.a
          as={Link}
          sx={{ variant: `links.secondary` }}
          to={`/${basePath}/${tagsPath}`.replace(/\/\/+/g, `/`)}
        >
          View all tags
        </Styled.a>
      </Flex>
      <Listing posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};
export default Blog;
```


```tsx
import React from "react";

const Blog = ({ posts }: PostsProps) => {
  const { tagsPath, basePath } = useSiteMetadata();

  return (
    <Layout>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <Heading variant="h2" as="h2">
          Blog
        </Heading>
        <Styled.a
          as={Link}
          sx={{ variant: `links.secondary` }}
          to={`/${basePath}/${tagsPath}`.replace(/\/\/+/g, `/`)}
        >
          View all tags
        </Styled.a>
      </Flex>
      <Listing posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default Blog;
```

---

| Hello | World |
|-------|------ |
| Foo   | Bar   |



