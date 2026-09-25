---
name: "chmod Calculator"
description: "Convert Linux file permissions between octal and symbolic formats."
category: "Linux"
icon: "Terminal"
seoTitle: "chmod Calculator - Linux File Permissions Converter"
metaDescription: "Easily calculate and convert Linux file permissions. Translate octal numbers (e.g. 755) to symbolic notation (rwxr-xr-x)."
---

## Understanding Linux File Permissions

In Linux and Unix-like operating systems, every file and directory has a set of permissions that dictate who can read, write, or execute it. These are divided into three groups:
1. **Owner:** The user who owns the file.
2. **Group:** The group associated with the file.
3. **Public (Others):** Everyone else.

## The Number System (Octal)

Permissions are often represented as a three-digit octal number (e.g., `755` or `644`). Each digit is the sum of the permissions for that group:
- **Read (r)** = 4
- **Write (w)** = 2
- **Execute (x)** = 1

For example, a `7` means Read (4) + Write (2) + Execute (1). A `5` means Read (4) + Execute (1).

## Using the Calculator

You can use this tool in two ways:
- **Type the Octal:** Enter a number like `644` in the input box, and the checkboxes and symbolic string will automatically update.
- **Toggle Checkboxes:** Click the Read/Write/Execute checkboxes for each group to visually construct your desired permission set and see the resulting `chmod` number.
