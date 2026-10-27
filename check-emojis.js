#!/usr/bin/env node
/**
 * Emoji Lint Check
 * Searches for emoji and pictographic Unicode characters in source files
 * to ensure none slip back into the codebase.
 */

const fs = require('fs');
const path = require('path');

// Emoji Unicode ranges
const EMOJI_RANGES = [
  [0x1F300, 0x1F9FF], // Miscellaneous Symbols and Pictographs, Emoticons, Transport, etc.
  [0x2600, 0x27BF],   // Miscellaneous Symbols (sun, moon, weather, etc.)
  [0x2300, 0x23FF],   // Miscellaneous Technical
  [0x2B50, 0x2B55],   // Stars
  [0xFE0F, 0xFE0F],   // Variation Selector-16 (emoji presentation)
];

const FILES_TO_CHECK = [
  'app.js',
  'app.css',
  'index.html'
];

function containsEmoji(text) {
  const results = [];
  
  for (let i = 0; i < text.length; i++) {
    const codePoint = text.codePointAt(i);
    
    for (const [start, end] of EMOJI_RANGES) {
      if (codePoint >= start && codePoint <= end) {
        // Get context around the emoji
        const lineStart = text.lastIndexOf('\n', i) + 1;
        const lineEnd = text.indexOf('\n', i);
        const line = text.substring(lineStart, lineEnd > -1 ? lineEnd : undefined);
        const lineNumber = text.substring(0, i).split('\n').length;
        const char = String.fromCodePoint(codePoint);
        
        results.push({
          char,
          codePoint: `U+${codePoint.toString(16).toUpperCase()}`,
          line: lineNumber,
          context: line.trim().substring(0, 100)
        });
      }
    }
    
    // Skip surrogate pairs
    if (codePoint > 0xFFFF) {
      i++;
    }
  }
  
  return results;
}

function checkFiles() {
  let hasErrors = false;
  
  for (const file of FILES_TO_CHECK) {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${file} (not found)`);
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const emojis = containsEmoji(content);
    
    if (emojis.length > 0) {
      hasErrors = true;
      console.log(`\n❌ Found ${emojis.length} emoji(s) in ${file}:`);
      
      for (const emoji of emojis) {
        console.log(`   Line ${emoji.line}: "${emoji.char}" (${emoji.codePoint})`);
        console.log(`   Context: ${emoji.context}`);
      }
    } else {
      console.log(`✅ ${file} - No emojis found`);
    }
  }
  
  if (hasErrors) {
    console.log('\n❌ Emoji check failed. Remove emoji characters and use SVG icons instead.');
    process.exit(1);
  } else {
    console.log('\n✅ All files passed emoji check!');
    process.exit(0);
  }
}

console.log('🔍 Checking for emoji characters in source files...\n');
checkFiles();
