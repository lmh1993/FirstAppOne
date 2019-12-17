import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';
describe('EventService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(EventService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=event.service.spec.js.map