import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class TruncatePipe {
    transform(value, args) {
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
TruncatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TruncatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, name: "truncate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'truncate',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NhbGVuZGFyL3NyYy9saWIvdHJ1bmNhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLFlBQVk7SUFDdkIsU0FBUyxDQUFDLEtBQWEsRUFBRSxJQUFXO1FBQ2xDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2hELE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzFFLENBQUM7O3lHQUxVLFlBQVk7dUdBQVosWUFBWTsyRkFBWixZQUFZO2tCQUh4QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxVQUFVO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAndHJ1bmNhdGUnLFxufSlcbmV4cG9ydCBjbGFzcyBUcnVuY2F0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgICBjb25zdCBsaW1pdCA9IGFyZ3MubGVuZ3RoID4gMCA/IHBhcnNlSW50KGFyZ3NbMF0sIDEwKSA6IDIwO1xuICAgIGNvbnN0IHRyYWlsID0gYXJncy5sZW5ndGggPiAxID8gYXJnc1sxXSA6ICcuLi4nO1xuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiBsaW1pdCA/IHZhbHVlLnN1YnN0cmluZygwLCBsaW1pdCkgKyB0cmFpbCA6IHZhbHVlO1xuICB9XG59XG4iXX0=