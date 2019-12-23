```typescript
type Data = {
  labels: string[]; // user choice
  datasets: {
    label: string; // user choice
    backgroundColor: string; // user choice
    borderColor: string; // user choice
    borderDash: [number, number]; // user choice
    pointBackgroundColor: string; // user choice
    pointBorderColor: string; // user choice
    pointHoverBackgroundColor: string; // user choice
    pointHoverBorderColor: string; // user choice
    data: number[]; // user choice
  }[]; // user choice
}

type Options = {
  maintainAspectRatio: boolean;
  title: {
    display: boolean; // user choice
    fontColor: string;
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    text: string; // user choice
  },
  layout: {
    padding: {
      top: number;
    }
  },
  legend: {
    labels: {
      fontColor: string;
      fontFamily: string;
      fontSize: number;
    }
  },
  tooltips: {
    backgroundColor: string; // user choice
    titleFontColor: string; // user choice
    titleFontFamily: string;
    titleFontSize: number;
    titleFontStyle: string;
    bodyFontColor: string; // user choice
    bodyFontFamily: string;
    bodyFontSize: number;
  },
  scale: {
    pointLabels: {
      fontColor: string;
      fontFamily: string;
      fontSize: number;
    },
    ticks: {
      fontColor: string;
      fontFamily: string;
      fontSize: number;
    },
  },
}

return <Radar data={data} options={options} />
```
