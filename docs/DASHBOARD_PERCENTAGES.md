# Dashboard Card Percentages Explanation

## What are the Percentages?

The percentages displayed on the dashboard stat cards (e.g., **+5%**, **+25%**, **-25%**) are **trend indicators** that show the direction of change for that metric.

## How They Work

### Current Implementation

Currently, these percentages are **visual indicators** based on the card's trend type:

- **+25%** (Green) - Appears when `trend: 'up'` - Indicates positive growth
- **-25%** (Red) - Appears when `trend: 'down'` - Indicates negative change
- **+5%** (Grey) - Appears when `trend: 'neutral'` - Indicates stable/no significant change

### Where They're Defined

In `src/screens/admin-dashboard/components/StatCard.tsx`:

```typescript
const trendValues = { 
  up: '+25%', 
  down: '-25%', 
  neutral: '+5%' 
};
```

## What They Represent

These percentages are **currently placeholder values** that indicate the **direction** of the trend, not actual calculated changes. They provide a visual cue about whether the metric is:
- **Growing** (up trend - green)
- **Declining** (down trend - red)  
- **Stable** (neutral trend - grey)

## Future Enhancement

To make these percentages **real and meaningful**, you would need to:

1. **Store historical data** - Track metric values over time (daily/weekly/monthly)
2. **Calculate actual percentage change** - Compare current period vs previous period
3. **Update the trend calculation** - Replace hardcoded values with real calculations

### Example Calculation

```typescript
// Pseudo-code for real percentage calculation
const currentValue = getCurrentMetricValue();
const previousValue = getPreviousPeriodValue();
const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
const trend = percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'neutral';
```

## Current Cards and Their Percentages

1. **Users Card**: Shows `+5%` (neutral) - Currently displays total users with admin/editor breakdown
2. **Pages Card**: Shows `+5%` (neutral) - Shows total pages count
3. **Blogs Card**: Shows `+5%` (neutral) - Shows published/draft breakdown
4. **Last Visitor Card**: Shows `+5%` (neutral) - Shows last visitor time

## Summary

- **The percentages are visual trend indicators**, not calculated values
- They show **direction** (up/down/neutral), not actual change amounts
- They help users **quickly understand** if metrics are improving, declining, or stable
- To make them real, you'd need to implement historical data tracking and percentage calculations

